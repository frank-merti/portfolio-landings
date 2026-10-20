import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { taskUpdateSchema } from '@/lib/validation';

async function findOwnedTask(taskId: string, userId: string) {
  return prisma.task.findFirst({
    where: { id: taskId, board: { ownerId: userId } }
  });
}

export async function PATCH(request: Request, { params }: { params: { taskId: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const task = await findOwnedTask(params.taskId, user.id);
  if (!task) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = taskUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: {
      ...(parsed.data.title !== undefined ? { title: parsed.data.title } : {}),
      ...(parsed.data.notes !== undefined ? { notes: parsed.data.notes || null } : {}),
      ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
      ...(parsed.data.priority !== undefined ? { priority: parsed.data.priority } : {})
    }
  });

  return NextResponse.json({ task: updated });
}

export async function DELETE(_request: Request, { params }: { params: { taskId: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const task = await findOwnedTask(params.taskId, user.id);
  if (!task) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  await prisma.task.delete({ where: { id: task.id } });
  return NextResponse.json({ ok: true });
}
