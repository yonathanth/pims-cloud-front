'use client';

import { useEffect, useState } from 'react';
import { formatRelativeTime } from '@/lib/utils';
import { Button, InlineLoading, InlineNotification } from '@carbon/react';
import { Renew } from '@carbon/icons-react';
import { useSync } from '@/hooks/use-sync';

interface HeaderProps {
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function DashboardHeader({ onRefresh, refreshing }: HeaderProps) {
  const { sync, loading: syncLoading, error: syncError, lastSync } = useSync();
  const [showNotification, setShowNotification] = useState(false);

  const handleSync = async () => {
    try {
      await sync(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    } catch (error) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  };

  return (
    <div className="dashboard-header">
      <div className="header-content">
        <div className="header-info">
          {lastSync && lastSync.results && lastSync.results.length > 0 && (
            <p className="last-updated">
              Last sync: {formatRelativeTime(lastSync.results[0].message || '')}
            </p>
          )}
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          {syncLoading ? (
            <InlineLoading description="Syncing..." />
          ) : (
            <Button
              kind="primary"
              size="md"
              onClick={handleSync}
              renderIcon={Renew}
              className="sync-button"
            >
              Sync Now
            </Button>
          )}
          {onRefresh && (
            refreshing ? (
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
            )
          )}
        </div>
      </div>
      {showNotification && (
        <div style={{ marginTop: '1rem' }}>
          {syncError ? (
            <InlineNotification
              kind="error"
              title="Sync Failed"
              subtitle={syncError}
              onClose={() => setShowNotification(false)}
            />
          ) : (
            <InlineNotification
              kind="success"
              title="Sync Successful"
              subtitle="Data has been synced successfully"
              onClose={() => setShowNotification(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
