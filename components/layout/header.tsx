'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { formatRelativeTime } from '@/lib/utils';
import { Button, InlineLoading } from '@carbon/react';
import { Renew } from '@carbon/icons-react';

interface HeaderProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function DashboardHeader({ onRefresh, refreshing }: HeaderProps) {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastUpdated = async () => {
      try {
        const data = await apiClient.getLastUpdated();
        setLastUpdated(data.lastUpdatedAt || null);
      } catch (error) {
        console.error('Failed to fetch last updated:', error);
      }
    };

    fetchLastUpdated();
    const interval = setInterval(fetchLastUpdated, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-header">
      <div className="header-content">
        <div className="header-info">
          <h1 className="page-title">
            Analytics
          </h1>
          <p className="page-subtitle">
            Track sales, inventory, and other key insights
          </p>
          {lastUpdated && (
            <p className="last-updated">
              Last updated: {formatRelativeTime(lastUpdated)}
            </p>
          )}
        </div>
        {onRefresh && (
          <div className="header-actions">
            {refreshing ? (
              <InlineLoading description="Refreshing..." />
            ) : (
              <Button
                kind="ghost"
                size="md"
                onClick={onRefresh}
                renderIcon={Renew}
                className="refresh-button"
              >
                Refresh
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
