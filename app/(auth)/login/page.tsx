'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { getAuthToken } from '@/lib/auth/auth';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (getAuthToken()) {
      router.push('/');
    }
  }, [router]);

  return <LoginForm />;
}
