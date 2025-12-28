'use client';

import { useState, useEffect } from 'react';
import { PeriodFilter, Period } from '@/components/analytics/period-filter';
import { getSalesByPeriod } from '@/lib/api/sales';
import { formatRelativeTime } from '@/lib/utils';
import { InlineLoading, InlineNotification, NotificationActionButton, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

// Get pharmacy ID from environment or use default
// NOTE: This should match REMOTE_ANALYTICS_PHARMACY_ID in the LAN app's .env
const PHARMACY_ID = process.env.NEXT_PUBLIC_PHARMACY_ID || 'derebe';

export default function SalesPage() {
  const [period, setPeriod] = useState<Period>('daily');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchSales = async (selectedPeriod: Period) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getSalesByPeriod(PHARMACY_ID, selectedPeriod);
      setData(result.sales);
      setLastUpdated(result.uploadedAt);
    } catch (err: any) {
      console.error('Failed to fetch sales:', err);
      setError(err.response?.data?.message || 'Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales(period);
  }, [period]);

  const tableHeaders = [
    { key: 'drugName', header: 'Product Name' },
    { key: 'category', header: 'Category' },
    { key: 'totalQuantity', header: 'Quantity Sold' },
    { key: 'totalRevenue', header: 'Revenue' },
    { key: 'totalProfit', header: 'Profit' },
    { key: 'unitPrice', header: 'Unit Price' },
  ];

  const tableRows = data?.products?.map((product: any, index: number) => ({
    id: `${product.drugId}-${index}`,
    drugName: product.drugName,
    category: product.category,
    totalQuantity: product.totalQuantity,
    totalRevenue: `ETB ${product.totalRevenue.toFixed(2)}`,
    totalProfit: `ETB ${product.totalProfit.toFixed(2)}`,
    unitPrice: `ETB ${product.unitPrice.toFixed(2)}`,
  })) || [];

  if (loading && !data) {
    return (
      <div className="dashboard-container">
        <InlineLoading description="Loading sales data..." />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
          <div className="dashboard-header-section">
            <div>
              <h1 className="page-title">Sales</h1>
              <p className="page-subtitle">Top 10 products by sales volume</p>
              {lastUpdated && (
                <p className="last-updated">
                  Last updated: {formatRelativeTime(lastUpdated)}
                </p>
              )}
            </div>
            <div className="period-filter-container">
              <PeriodFilter value={period} onChange={setPeriod} />
            </div>
          </div>

          {error && (
            <div style={{ marginBottom: '1rem' }}>
              <InlineNotification
                kind="error"
                title="Error"
                subtitle={error}
              />
              <div style={{ marginTop: '0.5rem' }}>
                <NotificationActionButton onClick={() => fetchSales(period)}>
                  Retry
                </NotificationActionButton>
              </div>
            </div>
          )}

          {data && (
            <>
              <div className="sales-summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="summary-card" style={{ padding: '1.5rem', background: '#f4f4f4', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Total Revenue</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#161616' }}>
                    ETB {data.summary?.totalRevenue?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="summary-card" style={{ padding: '1.5rem', background: '#f4f4f4', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Total Profit</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#161616' }}>
                    ETB {data.summary?.totalProfit?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="summary-card" style={{ padding: '1.5rem', background: '#f4f4f4', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Total Quantity</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#161616' }}>
                    {data.summary?.totalQuantitySold || 0}
                  </p>
                </div>
                <div className="summary-card" style={{ padding: '1.5rem', background: '#f4f4f4', borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Products Sold</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#161616' }}>
                    {data.summary?.numberOfProductsSold || 0}
                  </p>
                </div>
              </div>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {tableHeaders.map((header) => (
                        <TableHeader key={header.key}>{header.header}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows.map((row: any) => (
                      <TableRow key={row.id}>
                        {tableHeaders.map((header) => (
                          <TableCell key={header.key}>{row[header.key]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
    </div>
  );
}

