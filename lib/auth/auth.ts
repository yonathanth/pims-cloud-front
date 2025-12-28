export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    console.log('💾 Storing token in localStorage and cookie');
    localStorage.setItem('auth_token', token);
    // Also store in cookie for middleware access
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`; // 7 days
    // Verify it was stored
    const stored = localStorage.getItem('auth_token');
    console.log('✅ Token stored:', stored ? 'Yes' : 'No');
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    console.log('🔍 Getting token from localStorage:', token ? `${token.substring(0, 20)}...` : 'None');
    return token;
  }
  return null;
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    console.log('🗑️ Removing auth tokens from localStorage and cookie');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    // Also remove cookie
    document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Lax';
  }
}

export function setAuthUser(user: { id: number; username: string; fullName?: string }): void {
  if (typeof window !== 'undefined') {
    console.log('💾 Storing user in localStorage:', user);
    localStorage.setItem('auth_user', JSON.stringify(user));
  }
}

export function getAuthUser(): { id: number; username: string; fullName?: string } | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('👤 User from localStorage:', user);
        return user;
      } catch {
        console.error('❌ Failed to parse user from localStorage');
        return null;
      }
    }
    console.log('👤 No user in localStorage');
  }
  return null;
}

export function isAuthenticated(): boolean {
  const hasToken = getAuthToken() !== null;
  console.log('🔐 isAuthenticated:', hasToken);
  return hasToken;
}

