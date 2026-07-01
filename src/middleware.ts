import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('admin_session')?.value;

  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedApi = pathname.startsWith('/api/archive');

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isProtectedApi && ['POST', 'PUT', 'DELETE'].includes(request.method) && !session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/archive/:path*'],
};