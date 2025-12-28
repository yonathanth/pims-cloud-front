'use client';

import { Select, SelectItem } from '@carbon/react';

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface PeriodFilterProps {
  value: Period;
  onChange: (period: Period) => void;
  id?: string;
}

export function PeriodFilter({ value, onChange, id = 'period-filter' }: PeriodFilterProps) {
  return (
    <Select
      id={id}
      labelText="Period"
      value={value}
      onChange={(e) => onChange(e.target.value as Period)}
      size="md"
    >
      <SelectItem value="daily" text="Daily" />
      <SelectItem value="weekly" text="Weekly" />
      <SelectItem value="monthly" text="Monthly" />
      <SelectItem value="yearly" text="Yearly" />
    </Select>
  );
}


