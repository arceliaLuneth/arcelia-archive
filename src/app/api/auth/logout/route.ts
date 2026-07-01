import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = NextResponse.redirect(new URL('/login', request.url));

  res.cookies.set('admin_session', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return res;
}