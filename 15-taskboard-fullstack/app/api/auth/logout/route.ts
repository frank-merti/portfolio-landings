import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';
import { destroySession } from '@/lib/session';

export async function POST() {
  await destroySession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
