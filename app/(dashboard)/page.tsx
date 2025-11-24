'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalytics } from '@/hooks/use-analytics';
import { isAuthenticated } from '@/lib/auth/auth';
import { DashboardHeader } from '@/components/layout/header';
import { MetricsCards } from '@/components/analytics/metrics-cards';
import { CategoryChart } from '@/components/analytics/category-chart';
import { MonthlyChart } from '@/components/analytics/monthly-chart';
import { ProductsTable } from '@/components/analytics/products-table';
import { SuppliersList } from '@/components/analytics/suppliers-list';
import { PerformersList } from '@/components/analytics/performers-list';
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
  Button,
} from '@carbon/react';

export default function DashboardPage() {
  const router = useRouter();
  const { data, loading, error, refetch } = useAnalytics();

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
              <Button
                onClick={refetch}
                kind="primary"
                style={{ marginTop: '1.5rem' }}
              >
                Retry
              </Button>
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

  // Debug: Log all metric labels
  console.log('📊 Metrics labels:', analytics.metrics?.map(m => m.label));
  console.log('📊 Inventory cards labels:', analytics.inventoryCards?.map(m => m.label));

  // Filter out TOTAL STOCK VALUE (case-insensitive)
  const filterStockValue = (metrics: any[]) => 
    metrics?.filter(m => !m.label?.toLowerCase().includes('total stock value')) || [];

  return (
    <>
      <DashboardHeader onRefresh={refetch} refreshing={loading} />
      <div className="dashboard-content">
        {/* Filters */}
        <div className="dashboard-filters">
          <Select
            id="time-range"
            labelText="Time range"
            defaultValue="all"
            className="filter-select"
          >
            <SelectItem value="all" text="All time" />
            <SelectItem value="daily" text="Daily" />
            <SelectItem value="monthly" text="Monthly" />
            <SelectItem value="yearly" text="Yearly" />
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="section-spacing">
          <MetricsCards 
            metrics={filterStockValue(analytics.metrics)} 
          />
        </div>

        {/* Inventory Cards */}
        <div className="section-spacing">
          <MetricsCards 
            metrics={filterStockValue(analytics.inventoryCards)} 
          />
        </div>

        {/* Tabs */}
        <div style={{ marginTop: '1rem' }}>
          <Tabs>
            <TabList aria-label="Analytics tabs">
              <Tab>Inventory Analytics</Tab>
              <Tab>Sales Analytics</Tab>
              <Tab>Supplier Analytics</Tab>
              <Tab>Employee Analytics</Tab>
            </TabList>
            <TabPanels>
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
              <TabPanel>
                <div className="tab-content">
                  <SuppliersList suppliers={analytics.topSuppliers} />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-content">
                  <div className="employee-header">
                    <div className="employee-metrics">
                      <MetricsCards metrics={analytics.metrics.slice(0, 4)} />
                    </div>
                    <div className="employee-filter">
                      <Select
                        id="sort-employees"
                        labelText="Sort employees by"
                        defaultValue="volume"
                      >
                        <SelectItem value="volume" text="Volume Sold" />
                        <SelectItem value="name" text="Name" />
                      </Select>
                    </div>
                  </div>
                  <PerformersList performers={analytics.topPerformers} />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
}
