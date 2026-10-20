import { cookies } from 'next/headers';
import { prisma } from './db';
import { SESSION_COOKIE } from './auth';

export async function getCurrentUser() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  return session.user;
}

export async function createSession(userId: string) {
  const { createSessionToken, sessionExpiry } = await import('./auth');
  const token = createSessionToken();
  const session = await prisma.session.create({
    data: { token, userId, expiresAt: sessionExpiry() }
  });
  return session;
}

export async function destroySession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }
}
