import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { taskSchema } from '@/lib/validation';

async function findOwnedBoard(boardId: string, userId: string) {
  return prisma.board.findFirst({ where: { id: boardId, ownerId: userId } });
}

export async function GET(_request: Request, { params }: { params: { boardId: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const board = await findOwnedBoard(params.boardId, user.id);
  if (!board) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const tasks = await prisma.task.findMany({
    where: { boardId: board.id },
    orderBy: { createdAt: 'asc' }
  });

  return NextResponse.json({ board, tasks });
}

export async function POST(request: Request, { params }: { params: { boardId: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const board = await findOwnedBoard(params.boardId, user.id);
  if (!board) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = taskSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title: parsed.data.title,
      notes: parsed.data.notes ?? null,
      status: parsed.data.status,
      priority: parsed.data.priority,
      boardId: board.id
    }
  });

  return NextResponse.json({ task }, { status: 201 });
}
