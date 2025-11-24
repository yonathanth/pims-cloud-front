'use client';

import { KeyMetric } from '@/types/analytics';
import { Tile } from '@carbon/react';

interface MetricsCardsProps {
  metrics?: KeyMetric[];
  title?: string;
}

export function MetricsCards({ metrics = [], title }: MetricsCardsProps) {
  return (
    <div className="metrics-cards-container">
      {title && (
        <h2 className="section-title">
          {title}
        </h2>
      )}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-card-content">
              <div className="metric-info">
                <p className="metric-label">
                  {metric.label}
                </p>
                <p className="metric-value">
                  {typeof metric.value === 'object' 
                    ? JSON.stringify(metric.value) 
                    : metric.value}
                </p>
              </div>
              {typeof metric.trendUp === 'boolean' && (
                <div
                  className="metric-trend"
                  data-trend={metric.trendUp ? 'up' : 'down'}
                >
                  <span className="metric-trend-icon">
                    {metric.trendUp ? '↑' : '↓'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
