import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes - only analytics and sales pages require authentication
  const isProtectedRoute = pathname.startsWith('/analytics') || 
                          pathname.startsWith('/sales');

  // If it's a protected route, check for auth token
  if (isProtectedRoute) {
    const token = request.cookies.get('auth_token');

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is on login page and already authenticated, redirect to dashboard
  if (pathname === '/login') {
    const token = request.cookies.get('auth_token');
    if (token) {
      return NextResponse.redirect(new URL('/analytics', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
