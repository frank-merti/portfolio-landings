import Link from 'next/link';
import { redirect } from 'next/navigation';
import BoardForm from '@/components/BoardForm';
import { prisma } from '@/lib/db';
import { getDictionary, getLanguage } from '@/lib/i18n';
import { getCurrentUser } from '@/lib/session';

export default async function BoardsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const language = getLanguage();
  const t = getDictionary(language);

  const boards = await prisma.board.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { tasks: true } } }
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <h1 className="font-display text-3xl">{t.boards_title}</h1>
        <BoardForm
          labels={{
            name: t.board_name,
            description: t.board_description,
            submit: t.board_new
          }}
        />
      </div>

      {boards.length === 0 ? (
        <p className="text-white/60">{t.boards_empty}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Link
              key={board.id}
              href={`/boards/${board.id}`}
              className="bg-panel p-6 rounded-2xl border border-white/5 hover:border-accent/50 transition"
            >
              <h2 className="font-display text-xl mb-1">{board.name}</h2>
              {board.description && <p className="text-white/60 text-sm mb-3">{board.description}</p>}
              <p className="text-xs text-white/40">
                {board._count.tasks} {t.board_tasks.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
