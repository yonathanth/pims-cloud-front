export interface KeyMetric {
  label: string;
  value: string | number | Record<string, any>;
  trendUp: boolean;
}

export interface CategorySlice {
  category: string;
  stockQty: number;
  soldQty: number;
}

export interface MonthlySeriesPoint {
  month: string;
  stocked: number;
  sold: number;
}

export interface SupplierSummary {
  id: number;
  name: string;
  volumeSupplied: number;
  valueSupplied: number;
  ordersDelivered: number;
  orderCompletionPct: number;
  mostSuppliedItem: string;
}

export interface TopPerformer {
  name: string;
  username: string;
  email: string;
  volumeSold: number;
}

export interface Product {
  genericName: string;
  tradeName?: string;
  sku?: string;
  batchNumber?: string;
  expiryDate?: string;
  quantity: number;
  location?: string;
  unitPrice: number;
  lastRestock?: string;
  supplier?: string;
  orderedQty?: number;
}

export interface AnalyticsResponse {
  metrics: KeyMetric[];
  inventoryCards: KeyMetric[];
  distributionByCategory: CategorySlice[];
  monthlyStockedVsSold: MonthlySeriesPoint[];
  topSuppliers: SupplierSummary[];
  topPerformers: TopPerformer[];
  outOfStockProducts: Product[];
  expiredProducts: Product[];
  soonToBeOutOfStockProducts: Product[];
  soonToExpireProducts: Product[];
  fastMovingProducts: Product[];
  slowMovingProducts: Product[];
  mostOrderedProducts: Product[];
}

export interface AnalyticsSnapshot {
  pharmacyId: string;
  pharmacyName?: string;
  lastUpdatedAt?: string;
  analytics: AnalyticsResponse;
  uploadedAt: string;
  storedAt: string;
}

export interface LastUpdated {
  pharmacyId: string;
  lastUpdatedAt: string | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    fullName?: string;
  };
}

