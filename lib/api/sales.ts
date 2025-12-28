import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.leyuworkpharmacy.com.et/api';

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface SalesSnapshot {
  pharmacyId: string;
  pharmacyName: string;
  lastUpdatedAt: string;
  sales: {
    summary: {
      numberOfProductsSold: number;
      totalQuantitySold: number;
      mostSoldItem: string;
      totalRevenue: number;
      totalProfit: number;
    };
    products: Array<{
      drugId: number;
      drugName: string;
      sku: string;
      category: string;
      totalQuantity: number;
      totalRevenue: number;
      totalProfit: number;
      unitPrice: number;
    }>;
    period: string;
  };
  uploadedAt: string;
  storedAt: string;
  period: string;
}

export async function getSalesByPeriod(
  pharmacyId: string,
  period: Period
): Promise<SalesSnapshot> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  // Remove trailing slash and ensure we don't double up on /api
  const baseUrl = API_URL.replace(/\/$/, '').replace(/\/api$/, '');
  
  const response = await axios.get<SalesSnapshot>(
    `${baseUrl}/api/sales/${pharmacyId}/${period}`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  
  return response.data;
}

