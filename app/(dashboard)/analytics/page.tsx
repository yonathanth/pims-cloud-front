'use client';

import { useState, useEffect } from 'react';
import { PeriodFilter, Period } from '@/components/analytics/period-filter';
import { AnalyticsTabs } from '@/components/analytics/analytics-tabs';
import { getAnalyticsByPeriod, Period as PeriodType } from '@/lib/api/analytics';
import { InlineLoading, NotificationActionButton, InlineNotification } from '@carbon/react';

// Get pharmacy ID from environment or use default
// NOTE: This should match REMOTE_ANALYTICS_PHARMACY_ID in the LAN app's .env
const PHARMACY_ID = process.env.NEXT_PUBLIC_PHARMACY_ID || 'derebe';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('daily');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (selectedPeriod: Period) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAnalyticsByPeriod(PHARMACY_ID, selectedPeriod as PeriodType);
      console.log('Analytics API response:', result);
      // Handle both 'analytics' and 'snapshot' field names for compatibility
      const resultAny = result as any;
      const analyticsData = result.analytics || resultAny.snapshot || result;
      setData(analyticsData);
    } catch (err: any) {
      console.error('Failed to fetch analytics:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  if (loading && !data) {
    return (
      <div className="dashboard-container">
        <InlineLoading description="Loading analytics..." />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
          <div className="dashboard-header-section">
            <div>
              <h1 className="page-title">Analytics</h1>
              <p className="page-subtitle">Track sales, inventory, and other key insights</p>
            </div>
            <div className="period-filter-container">
              <PeriodFilter value={period} onChange={setPeriod} />
            </div>
          </div>

          {error && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Error"
                subtitle={error}
              />
              <div style={{ marginTop: '0.5rem' }}>
                <NotificationActionButton onClick={() => fetchAnalytics(period)}>
                  Retry
                </NotificationActionButton>
              </div>
            </div>
          )}

          {data && (
            <AnalyticsTabs data={data} />
          )}
    </div>
  );
}

