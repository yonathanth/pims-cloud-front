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
      const response = await apiClient.login(credentials);
      setAuthToken(response.access_token);
      setAuthUser(response.user);
      setUser(response.user);
      router.push('/');
    } catch (error: any) {
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

