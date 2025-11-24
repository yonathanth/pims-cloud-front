'use client';

import { CategorySlice } from '@/types/analytics';
import { Tile } from '@carbon/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryChartProps {
  data?: CategorySlice[];
}

const COLORS = ['#0f62fe', '#4589ff', '#78a9ff', '#a6c8ff', '#be95ff', '#8a3ffc', '#d0e2ff'];

export function CategoryChart({ data = [] }: CategoryChartProps) {
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.stockQty,
    sold: item.soldQty,
  }));

  return (
    <Tile className="chart-tile">
      <h3 className="chart-title">
        Distribution by Category
      </h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => {
                // Shorter labels on mobile
                const displayName = window.innerWidth < 768 ? name.substring(0, 10) : name;
                return `${displayName} ${(percent * 100).toFixed(0)}%`;
              }}
              outerRadius={window.innerWidth < 480 ? 60 : window.innerWidth < 768 ? 80 : 100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Tile>
  );
}
