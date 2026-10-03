'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  deletePushSubscription,
  getPushPublicKey,
  savePushSubscription,
  sendTestPush,
} from '@/lib/api/push';

// NOTE: This should match REMOTE_ANALYTICS_PHARMACY_ID in the LAN app's .env
const PHARMACY_ID = process.env.NEXT_PUBLIC_PHARMACY_ID || 'derebe';

export type PushState =
  | 'loading'
  | 'unsupported' // browser can't do push (on iPhone: add to Home Screen first)
  | 'denied' // user blocked notifications for this site
  | 'off'
  | 'on';

// The push service expects the VAPID key as raw bytes
function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

const isSupported = () =>
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window;

export function usePushNotifications() {
  const [state, setState] = useState<PushState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isSupported()) {
      setState('unsupported');
      return;
    }
    if (Notification.permission === 'denied') {
      setState('denied');
      return;
    }
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => reg.pushManager.getSubscription())
      .then(async (sub) => {
        if (sub) {
          // Re-save in case the server lost it or the keys rotated
          await savePushSubscription(PHARMACY_ID, sub).catch(() => {});
        }
        setState(sub ? 'on' : 'off');
      })
      .catch(() => setState('off'));
  }, []);

  // Resolves true once this device is subscribed
  const enable = useCallback(async (): Promise<boolean> => {
    setBusy(true);
    setError(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setState(permission === 'denied' ? 'denied' : 'off');
        return false;
      }
      const publicKey = await getPushPublicKey();
      if (!publicKey) throw new Error('Push notifications are not set up on the server yet.');

      const reg = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;
      const sub =
        (await reg.pushManager.getSubscription()) ??
        (await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
        }));
      await savePushSubscription(PHARMACY_ID, sub);
      setState('on');
      await sendTestPush(PHARMACY_ID).catch(() => {});
      return true;
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || 'Could not enable notifications');
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  const disable = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const reg = await navigator.serviceWorker.getRegistration('/sw.js');
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        await deletePushSubscription(sub.endpoint).catch(() => {});
        await sub.unsubscribe();
      }
      setState('off');
    } catch (e: any) {
      setError(e?.message || 'Could not turn off notifications');
    } finally {
      setBusy(false);
    }
  }, []);

  return { state, error, busy, enable, disable, clearError: () => setError(null) };
}
