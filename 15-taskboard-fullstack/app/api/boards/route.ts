import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { boardSchema } from '@/lib/validation';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const boards = await prisma.board.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { tasks: true } } }
  });

  return NextResponse.json({ boards });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = boardSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const board = await prisma.board.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      color: parsed.data.color,
      ownerId: user.id
    }
  });

  return NextResponse.json({ board }, { status: 201 });
}
