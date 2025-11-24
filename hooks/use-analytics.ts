'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { AnalyticsSnapshot } from '@/types/analytics';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      console.log('📊 Fetching analytics data...');
      setLoading(true);
      setError(null);
      const result = await apiClient.getAnalytics();
      console.log('✅ Analytics data received');
      setData(result);
    } catch (err: any) {
      console.error('❌ Failed to fetch analytics:', err);
      console.error('❌ Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // Refresh every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}

