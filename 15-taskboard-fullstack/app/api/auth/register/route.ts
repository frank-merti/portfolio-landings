import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, SESSION_COOKIE } from '@/lib/auth';
import { createSession } from '@/lib/session';
import { registerSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ error: 'email_taken' }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      password: await hashPassword(parsed.data.password)
    }
  });

  const session = await createSession(user.id);
  const response = NextResponse.json(
    { user: { id: user.id, name: user.name, email: user.email } },
    { status: 201 }
  );
  response.cookies.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires: session.expiresAt
  });

  return response;
}
