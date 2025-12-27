'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@carbon/react';
import { MetricsCards } from './metrics-cards';
import SummaryCards from './summary-cards';
import { ProductsTable } from './products-table';

interface AnalyticsTabsProps {
  data: any;
}

export function AnalyticsTabs({ data }: AnalyticsTabsProps) {
  return (
    <Tabs>
      <TabList contained aria-label="Analytics tabs">
        <Tab>Inventory</Tab>
        <Tab>Sales</Tab>
        <Tab>Supply</Tab>
      </TabList>
      <TabPanels>
        {/* Inventory Tab */}
        <TabPanel>
          <div className="analytics-tab-content">
            <SummaryCards summaryData={data.inventory_cards || []} />
            <ProductsTable
              title="Out of Stock Products"
              products={data.out_of_stock_products || []}
            />
            <ProductsTable
              title="Expired Products"
              products={data.expired_products || []}
            />
            <ProductsTable
              title="Soon to Expire Products"
              products={data.soon_to_expire_products || []}
            />
            <ProductsTable
              title="Low Stock Products"
              products={data.soon_to_be_out_of_stock_products || []}
            />
          </div>
        </TabPanel>

        {/* Sales Tab */}
        <TabPanel>
          <div className="analytics-tab-content">
            <MetricsCards metrics={data.metrics || []} />
            <ProductsTable
              title="Fast Moving Products"
              products={data.fast_moving_products || []}
            />
            <ProductsTable
              title="Slow Moving Products"
              products={data.slow_moving_products || []}
            />
          </div>
        </TabPanel>

        {/* Supply Tab */}
        <TabPanel>
          <div className="analytics-tab-content">
            {/* Top Suppliers would go here - need to check if this data is available */}
            <SummaryCards summaryData={data.supply_cards || []} />
            <ProductsTable
              title="Most Ordered Products"
              products={data.most_ordered_products || []}
            />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

