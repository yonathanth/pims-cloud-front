import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.leyuworkpharmacy.com.et/api';
// Remove trailing slash and ensure we don't double up on /api
const baseUrl = API_URL.replace(/\/$/, '').replace(/\/api$/, '');

const authHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getPushPublicKey(): Promise<string | null> {
  const res = await axios.get<{ publicKey: string | null }>(`${baseUrl}/api/push/public-key`, {
    headers: authHeaders(),
  });
  return res.data.publicKey;
}

export async function savePushSubscription(pharmacyId: string, subscription: PushSubscription) {
  await axios.post(
    `${baseUrl}/api/push/subscribe`,
    { pharmacyId, subscription: subscription.toJSON() },
    { headers: authHeaders() },
  );
}

export async function deletePushSubscription(endpoint: string) {
  await axios.post(`${baseUrl}/api/push/unsubscribe`, { endpoint }, { headers: authHeaders() });
}

export async function sendTestPush(pharmacyId: string) {
  const res = await axios.post<{ sent: number; removed: number; failed: number }>(
    `${baseUrl}/api/push/test`,
    { pharmacyId },
    { headers: authHeaders() },
  );
  return res.data;
}
