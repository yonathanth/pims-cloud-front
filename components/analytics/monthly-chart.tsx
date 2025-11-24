'use client';

import { MonthlySeriesPoint } from '@/types/analytics';
import { Tile } from '@carbon/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyChartProps {
  data?: MonthlySeriesPoint[];
}

export function MonthlyChart({ data = [] }: MonthlyChartProps) {
  return (
    <Tile className="chart-tile">
      <h3 className="chart-title">
        Monthly Stocked vs Sold
      </h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--cds-border-subtle)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--cds-text-secondary)"
              style={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem' }}
            />
            <YAxis 
              stroke="var(--cds-text-secondary)"
              style={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem' }}
            />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem' }} />
            <Line
              type="monotone"
              dataKey="stocked"
              stroke="#0f62fe"
              strokeWidth={2}
              name="Stocked"
            />
            <Line
              type="monotone"
              dataKey="sold"
              stroke="#24a148"
              strokeWidth={2}
              name="Sold"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Tile>
  );
}
