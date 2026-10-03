'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { setAuthToken, setAuthUser, removeAuthToken, getAuthUser } from '@/lib/auth/auth';
import { LoginRequest } from '@/types/analytics';

// Where to go after login: the page the middleware sent us away from
// (?redirect=/sales), if it's a path on this site; otherwise analytics
function getPostLoginPath(): string {
  const target = new URLSearchParams(window.location.search).get('redirect');
  return target && target.startsWith('/') && !target.startsWith('//')
    ? target
    : '/analytics';
}

export function useAuth() {
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
      
      // Full page load, not router.push: the client router may have cached the
      // middleware's "no cookie, go to /login" redirect for /analytics, which
      // left the login page stuck until a manual reload
      console.log('✅ Token stored, redirecting...');
      window.location.replace(getPostLoginPath());
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      console.error('❌ Error response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    // Full page load so no cached, logged-in page is shown again
    window.location.replace('/login');
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}

