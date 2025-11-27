'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalytics } from '@/hooks/use-analytics';
import { isAuthenticated } from '@/lib/auth/auth';
import { DashboardHeader } from '@/components/layout/header';
import SummaryCards from '@/components/analytics/summary-cards';
import { CategoryChart } from '@/components/analytics/category-chart';
import { MonthlyChart } from '@/components/analytics/monthly-chart';
import { ProductsTable } from '@/components/analytics/products-table';
import { 
  Tabs, 
  Tab, 
  TabList, 
  TabPanels, 
  TabPanel,
  InlineLoading,
  Select,
  SelectItem,
  NumberInput,
  Dropdown,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';

export default function DashboardPage() {
  const router = useRouter();
  const { data, loading, error, refetch } = useAnalytics();
  
  // Filter state (matching local analytics page)
  const [timeFilter, setTimeFilter] = useState<'daily' | 'monthly' | 'yearly' | 'custom' | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(10);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (loading && !data) {
    return (
      <>
        <DashboardHeader />
        <div className="loading-container">
          <InlineLoading description="Loading analytics..." />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashboardHeader onRefresh={refetch} refreshing={false} />
        <div className="dashboard-content">
          <div className="loading-container">
            <div
              className="enhanced-card"
              style={{
                backgroundColor: 'var(--cds-support-error-inverse)',
                border: '1px solid var(--cds-support-error)',
                color: 'var(--cds-support-error)',
                maxWidth: '600px',
                textAlign: 'center'
              }}
            >
              <p style={{ fontWeight: 600, margin: 0, fontSize: '1.125rem' }}>Error loading analytics</p>
              <p style={{ fontSize: '0.875rem', margin: '0.75rem 0 0 0', opacity: 0.9 }}>{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <DashboardHeader />
        <div className="dashboard-content">
          <div className="loading-container">
            <p style={{ color: 'var(--cds-text-secondary)', fontSize: '1rem' }}>No analytics data available</p>
          </div>
        </div>
      </>
    );
  }

  const { analytics } = data;

  // Transform metrics to match SummaryCards format
  const summaryData = analytics.metrics?.map(metric => ({
    label: metric.label,
    value: metric.value,
    trend: metric.trendUp ? 'up' as const : 'down' as const
  })) || [];

  // Transform inventory cards
  const inventoryCardsData = analytics.inventoryCards?.map(metric => ({
    label: metric.label,
    value: metric.value,
    trend: metric.trendUp ? 'up' as const : 'down' as const
  })) || [];

  return (
    <>
      <DashboardHeader onRefresh={refetch} refreshing={loading} />
      <div className="dashboard-content">
        {/* Filters - matching local analytics page */}
        <div className="dashboard-filters" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1rem', 
          marginBottom: '1.5rem',
          alignItems: 'flex-end'
        }}>
          <div style={{ minWidth: '200px', flex: '0 1 auto' }}>
            <Dropdown
              id="analytics-time-filter"
              invalidText="Invalid selection"
              itemToString={(item) => (item ? item.label : "")}
              items={[
                { label: 'All time', value: undefined },
                { label: 'Daily', value: 'daily' },
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
                { label: 'Custom range', value: 'custom' },
              ] as Array<{label: string; value: any}>}
              selectedItem={timeFilter ? { label: timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1), value: timeFilter } : { label: 'All time', value: undefined }}
              label={timeFilter ? timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1) : 'All time'}
              titleText="Time range"
              type="default"
              onChange={(e: any) => setTimeFilter(e.selectedItem?.value)}
            />
          </div>
          {timeFilter === 'custom' && (
            <div style={{ minWidth: '300px', flex: '0 1 auto' }}>
              <DatePicker datePickerType="range" onChange={(dates: any) => {
                if (Array.isArray(dates) && dates.length === 2) {
                  setDateRange([dates[0], dates[1]]);
                }
              }}>
                <DatePickerInput id="analytics-start" labelText="Start date" placeholder="mm/dd/yyyy" />
                <DatePickerInput id="analytics-end" labelText="End date" placeholder="mm/dd/yyyy" />
              </DatePicker>
            </div>
          )}
          <div style={{ minWidth: '200px', flex: '0 1 auto' }}>
            <NumberInput
              id="low-stock-threshold"
              label="Low stock threshold"
              min={0}
              value={lowStockThreshold}
              onChange={(e: any) => {
                const v = Number(e.imaginaryTarget?.value ?? e.target?.value);
                setLowStockThreshold(Number.isNaN(v) ? 0 : v);
              }}
            />
          </div>
        </div>

        {/* Key Metrics - Summary Cards */}
        <div className="section-spacing">
          <SummaryCards summaryData={summaryData} />
        </div>

        {/* Inventory Cards */}
        {inventoryCardsData.length > 0 && (
          <div className="section-spacing">
            <SummaryCards summaryData={inventoryCardsData} />
          </div>
        )}

        {/* Tabs - Only Inventory and Sales (no Supplier/Employee) */}
        <div style={{ marginTop: '1.5rem' }}>
          <Tabs>
            <TabList aria-label="Analytics tabs">
              <Tab>Inventory Analytics</Tab>
              <Tab>Sales Analytics</Tab>
            </TabList>
            <TabPanels>
              {/* Inventory Analytics Tab */}
              <TabPanel>
                <div className="dashboard-grid">
                  <CategoryChart data={analytics.distributionByCategory} />
                  <MonthlyChart data={analytics.monthlyStockedVsSold} />
                </div>
                <div className="dashboard-grid">
                  <ProductsTable
                    products={analytics.outOfStockProducts}
                    title="Out of Stock"
                  />
                  <ProductsTable
                    products={analytics.soonToBeOutOfStockProducts}
                    title="Soon to be Out of Stock"
                  />
                </div>
                <div className="dashboard-grid">
                  <ProductsTable
                    products={analytics.expiredProducts}
                    title="Expired Products"
                  />
                  <ProductsTable
                    products={analytics.soonToExpireProducts}
                    title="Soon to Expire"
                  />
                </div>
              </TabPanel>
              {/* Sales Analytics Tab */}
              <TabPanel>
                <div className="dashboard-grid">
                  <ProductsTable
                    products={analytics.fastMovingProducts}
                    title="Fast Moving Products"
                  />
                  <ProductsTable
                    products={analytics.slowMovingProducts}
                    title="Slow Moving Products"
                  />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
}
