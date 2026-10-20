import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import TaskBoard from '@/components/TaskBoard';
import { prisma } from '@/lib/db';
import { getDictionary, getLanguage } from '@/lib/i18n';
import { getCurrentUser } from '@/lib/session';
import { toTask } from '@/lib/tasks';

export default async function BoardPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const language = getLanguage();
  const t = getDictionary(language);

  const board = await prisma.board.findFirst({
    where: { id: params.id, ownerId: user.id },
    include: { tasks: { orderBy: { createdAt: 'asc' } } }
  });

  if (!board) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <Link href="/boards" className="text-sm text-white/50 hover:text-white transition">
        ← {t.nav_boards}
      </Link>
      <h1 className="font-display text-3xl mt-2 mb-2">{board.name}</h1>
      {board.description && <p className="text-white/60 mb-10">{board.description}</p>}

      <TaskBoard
        boardId={board.id}
        initialTasks={board.tasks.map(toTask)}
        labels={{
          status: { todo: t.status_todo, doing: t.status_doing, done: t.status_done },
          priority: { low: t.priority_low, medium: t.priority_medium, high: t.priority_high },
          taskTitle: t.task_title,
          taskNotes: t.task_notes,
          taskPriority: t.task_priority,
          taskCreate: t.task_create,
          taskMove: t.task_move,
          taskDelete: t.task_delete
        }}
      />
    </main>
  );
}
