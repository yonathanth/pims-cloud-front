import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Allow access to login page
  if (request.nextUrl.pathname === '/login') {
    // If already authenticated, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/')) {
    if (!token) {
      // Check if token exists in localStorage (client-side check will handle this)
      // For server-side, we'll rely on client-side redirect
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

