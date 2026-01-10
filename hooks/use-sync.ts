'use client';

import { useState } from 'react';
import { triggerSync, getSyncStatus, SyncResponse } from '@/lib/api/sync';

export function useSync() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<SyncResponse | null>(null);

  const sync = async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      const result = await triggerSync(force);
      setLastSync(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to sync data';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchStatus = async () => {
    try {
      const status = await getSyncStatus();
      return status;
    } catch (err: any) {
      console.error('Failed to fetch sync status:', err);
      return null;
    }
  };

  return {
    sync,
    fetchStatus,
    loading,
    error,
    lastSync,
  };
}




