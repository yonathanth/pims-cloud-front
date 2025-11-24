'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  Button,
  TextInput,
  PasswordInput,
  InlineNotification,
} from '@carbon/react';
import {
  Login as LoginIcon,
} from '@carbon/icons-react';

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid credentials. Please check your username and password.');
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div style={{ width: '100%', maxWidth: '440px', padding: '1rem', position: 'relative', zIndex: 1 }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 300, 
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
            color: 'var(--cds-text-primary)'
          }}>
            Welcome to <strong style={{ fontWeight: 600 }}>PIMS</strong>
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            color: 'var(--cds-text-secondary)',
            margin: 0
          }}>
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div className="login-card">
          {error && (
            <InlineNotification
              kind="error"
              title="Error"
              subtitle={error}
              onCloseButtonClick={() => setError(null)}
              style={{ marginBottom: '1.5rem' }}
            />
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TextInput
              id="username"
              labelText="Username"
              placeholder="Enter your username"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />

            <PasswordInput
              id="password"
              labelText="Password"
              placeholder="Enter your password"
              size="lg"
              hidePasswordLabel="Hide password"
              showPasswordLabel="Show password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />

            <Button
              type="submit"
              kind="primary"
              size="lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
              renderIcon={LoginIcon}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: 'var(--cds-text-secondary)',
            margin: 0,
            opacity: 0.8
          }}>
            PIMS Analytics - Pharmacy Inventory Management System
          </p>
        </div>
      </div>
    </div>
  );
}
