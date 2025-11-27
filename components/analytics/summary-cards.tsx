'use client';

import React from 'react';
import { Time } from '@carbon/icons-react';
import { KeyMetric } from '@/types/analytics';

interface SummaryCardProps {
  summaryData: {
    label: string;
    value: string | number | Record<string, unknown> | null;
    trend: 'up' | 'down';
  }[];
}

// List of metric labels that are affected by time filter
const TIME_FILTERED_METRICS = [
  'Total Revenue',
  'Total Profit',
  'Total Sales (qty)',
  'Total Transactions',
  'Expiring in 30 days',
  'Expired Items',
  'Top seller',
  'Avg Sale Value (per unit)',
  'Most Ordered Product',
  'Turnover Rate',
];

const SummaryCards: React.FC<SummaryCardProps> = ({ summaryData }) => {
  const normalizeSign = (p: string) => {
    // collapse odd sign combinations like "+-83.1%" -> "-83.1%"
    let s = p.trim();
    if (s.startsWith('+-') || s.startsWith('-+')) s = '-' + s.slice(2);
    if (s.startsWith('++')) s = '+' + s.slice(2);
    if (s.startsWith('--')) s = '-' + s.slice(2);
    return s;
  };

  const isIncompleteOrdersLabel = (label: string) =>
    /incomplete\s*orders\s*breakdown/i.test(label);

  const extractPending = (obj: Record<string, unknown>): number => {
    let raw: number | string | null | undefined;
    if ('pending' in obj) {
      raw = obj['pending'] as number | string | null | undefined;
    } else {
      raw = undefined;
    }
    const n = typeof raw === 'number' ? raw : Number(raw ?? 0);
    return Number.isFinite(n) ? n : 0;
  };

  const parseValue = (
    label: string,
    value: string | number | Record<string, any> | null,
  ): { displayLabel: string; main: string; percent?: string } => {
    let displayLabel = label;
    // If value is object and label indicates incomplete orders, show pending only
    if (value && typeof value === 'object') {
      if (isIncompleteOrdersLabel(label)) {
        displayLabel = 'Pending Orders';
        return {
          displayLabel,
          main: String(extractPending(value as Record<string, unknown>)),
        };
      }
      // For other objects, show a compact count of keys
      return {
        displayLabel,
        main: `${Object.keys(value).length} key${Object.keys(value).length !== 1 ? 's' : ''}`,
      };
    }
    let str = String(value ?? '');
    // Handle when backend sends JSON string for breakdown
    if (/^\s*\{/.test(str) && /\}\s*$/.test(str)) {
      try {
        const parsed = JSON.parse(str);
        if (isIncompleteOrdersLabel(label)) {
          displayLabel = 'Pending Orders';
          return { displayLabel, main: String(extractPending(parsed)) };
        }
        // fallback display stringified if object isn't the breakdown we expect
        return { displayLabel, main: JSON.stringify(parsed) };
      } catch (err) {
        // Intentionally non-fatal; backend might send plain strings. Log for observability.
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            'Failed to parse JSON in SummaryCards.parseValue:',
            err,
          );
        }
      }
    }
    // Extract a trailing percent in parentheses: e.g., "1234 (+8.4%)"
    const m = str.match(/^(.*?)(?:\s*\(([+\-]*\d+(?:\.\d+)?%)\)\s*)$/);
    if (m && m[2]) {
      return { displayLabel, main: m[1].trim(), percent: normalizeSign(m[2]) };
    }
    return { displayLabel, main: str };
  };

  const isTimeFiltered = (label: string): boolean => {
    return TIME_FILTERED_METRICS.some(
      (metric) => label.toLowerCase().includes(metric.toLowerCase()),
    );
  };

  return (
    <div className="summary-cards-grid">
      {summaryData.map(({ label, value, trend }, index) => {
        const { displayLabel, main, percent } = parseValue(label, value);
        const timeFiltered = isTimeFiltered(displayLabel);
        return (
          <div
            key={index}
            className={`summary-card ${timeFiltered ? 'time-filtered' : ''}`}
            title={
              timeFiltered
                ? 'This metric is filtered by the selected time range'
                : 'This metric shows current/all-time data'
            }
          >
            <div className="summary-card-header">
              <span className="summary-card-label">{displayLabel}</span>
              {timeFiltered && (
                <Time
                  size={12}
                  className="time-filter-icon"
                  title="Filtered by time range"
                />
              )}
            </div>
            <div className="summary-card-body">
              <strong className="summary-card-value">
                {main}
                {percent ? (
                  <sub className="summary-card-percent">{percent}</sub>
                ) : null}
              </strong>
              <span
                className={`summary-card-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}
              >
                {trend === 'up' ? '↑' : '↓'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;

