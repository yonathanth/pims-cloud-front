import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.leyuworkpharmacy.com.et/api';

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface AnalyticsSnapshot {
  pharmacyId: string;
  pharmacyName: string;
  lastUpdatedAt: string;
  analytics: any;
  uploadedAt: string;
  storedAt: string;
  period: string;
}

export async function getAnalyticsByPeriod(
  pharmacyId: string,
  period: Period
): Promise<AnalyticsSnapshot> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  // Remove trailing slash and ensure we don't double up on /api
  const baseUrl = API_URL.replace(/\/$/, '').replace(/\/api$/, '');
  
  const response = await axios.get<AnalyticsSnapshot>(
    `${baseUrl}/api/analytics/${pharmacyId}/${period}`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  
  return response.data;
}

