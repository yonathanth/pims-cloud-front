'use client';

import { KeyMetric } from '@/types/analytics';
import { Tile } from '@carbon/react';

interface MetricsCardsProps {
  metrics?: KeyMetric[];
  title?: string;
}

function parseMetricValue(value: string | number | Record<string, any>) {
  if (typeof value === 'object') {
    return { mainValue: JSON.stringify(value), percentage: null };
  }
  
  const valueStr = String(value);
  // Match pattern like "637.00 (+100.0%)" or "637.00 (-50.0%)"
  // Also handles malformed cases like "(+--19.3%)" by cleaning them up
  const match = valueStr.match(/^(.+?)\s*\(([+-]?\d+\.?\d*%)\)$/);
  
  if (match) {
    let percentage = match[2].trim();
    // Clean up malformed percentages like "+-19.3%" to "-19.3%"
    percentage = percentage.replace(/\+--/, '-').replace(/--/, '-');
    
    return {
      mainValue: match[1].trim(),
      percentage: percentage,
    };
  }
  
  return { mainValue: valueStr, percentage: null };
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
        {metrics.map((metric, index) => {
          const { mainValue, percentage } = parseMetricValue(metric.value);
          
          return (
            <div key={index} className="metric-card">
              <div className="metric-card-content">
                <div className="metric-info">
                  <p className="metric-label">
                    {metric.label}
                  </p>
                  <div className="metric-value-container">
                    <p className="metric-value">
                      {mainValue}
                    </p>
                    {percentage && (
                      <span className="metric-percentage">
                        {percentage}
                      </span>
                    )}
                  </div>
                </div>
                {typeof metric.trendUp === 'boolean' && (
                  <div
                    className="metric-trend-indicator"
                    data-trend={metric.trendUp ? 'up' : 'down'}
                    title={metric.trendUp ? 'Trending up' : 'Trending down'}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
