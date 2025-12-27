'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getAuthToken } from '@/lib/auth/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (getAuthToken()) {
      router.push('/analytics');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      await login({ username, password });
      // Redirect handled by useAuth hook
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid credentials. Please check your username and password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white border border-gray-200 p-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">
            Login
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Sign in to access the dashboard
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors border border-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

