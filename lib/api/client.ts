import axios, { AxiosInstance, AxiosError } from 'axios';
import { LoginRequest, LoginResponse, AnalyticsSnapshot, LastUpdated } from '@/types/analytics';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'NEXT_PUBLIC_API_URL=http://api.leyuworkpharmacy.com.et';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    // Handle 401 errors (unauthorized)
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          // Don't redirect if it's the account update endpoint (wrong current password)
          const url = error.config?.url || '';
          if (!url.includes('/auth/account')) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  }

  async updateAccount(data: {
    username?: string;
    fullName?: string;
    currentPassword?: string;
    newPassword?: string;
  }): Promise<{ user: { id: number; username: string; fullName?: string } }> {
    const response = await this.client.patch('/auth/account', data);
    return response.data;
  }

  async getAnalytics(): Promise<AnalyticsSnapshot> {
    const response = await this.client.get<AnalyticsSnapshot>('/api/pharmacy/analytics/latest');
    return response.data;
  }

  async getLastUpdated(): Promise<LastUpdated> {
    const response = await this.client.get<LastUpdated>('/api/pharmacy/analytics/last-updated');
    return response.data;
  }
}

export const apiClient = new ApiClient();

