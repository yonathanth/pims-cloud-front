'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api/client';
import { setAuthToken, setAuthUser, removeAuthToken, getAuthUser } from '@/lib/auth/auth';
import { LoginRequest } from '@/types/analytics';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number; username: string; fullName?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getAuthUser();
    setUser(savedUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      console.log('🔐 Attempting login...');
      const response = await apiClient.login(credentials);
      console.log('✅ Login successful:', response.user);
      
      setAuthToken(response.access_token);
      setAuthUser(response.user);
      setUser(response.user);
      
      console.log('✅ Token stored, redirecting to dashboard...');
      router.push('/');
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}

