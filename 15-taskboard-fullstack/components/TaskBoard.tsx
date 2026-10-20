'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Task, TaskPriority } from '@/lib/tasks';

type Labels = {
  status: Record<'todo' | 'doing' | 'done', string>;
  priority: Record<TaskPriority, string>;
  taskTitle: string;
  taskNotes: string;
  taskPriority: string;
  taskCreate: string;
  taskMove: string;
  taskDelete: string;
};

const STATUS_ORDER = ['todo', 'doing', 'done'] as const;
const PRIORITY_ORDER: TaskPriority[] = ['high', 'medium', 'low'];

const PRIORITY_STYLES: Record<TaskPriority, string> = {
  high: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
};

export default function TaskBoard({
  boardId,
  initialTasks,
  labels
}: {
  boardId: string;
  initialTasks: Task[];
  labels: Labels;
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [pending, setPending] = useState(false);

  const refresh = async () => {
    const response = await fetch(`/api/boards/${boardId}/tasks`);
    if (response.ok) {
      const data = await response.json();
      setTasks(data.tasks);
    }
  };

  const createTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/boards/${boardId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: String(form.get('title') ?? ''),
        notes: String(form.get('notes') ?? ''),
        priority: String(form.get('priority') ?? 'medium')
      })
    });

    setPending(false);
    event.currentTarget.reset();

    if (response.ok) {
      await refresh();
      router.refresh();
    }
  };

  const moveTask = async (task: Task) => {
    const index = STATUS_ORDER.indexOf(task.status);
    const nextStatus = STATUS_ORDER[(index + 1) % STATUS_ORDER.length];

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    });

    if (response.ok) {
      await refresh();
    }
  };

  const deleteTask = async (task: Task) => {
    const response = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
    if (response.ok) {
      await refresh();
    }
  };

  return (
    <div>
      <form onSubmit={createTask} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] mb-10">
        <input
          name="title"
          required
          minLength={2}
          placeholder={labels.taskTitle}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
        />
        <input
          name="notes"
          placeholder={labels.taskNotes}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
        />
        <div className="flex gap-3">
          <select
            name="priority"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
          >
            {PRIORITY_ORDER.map((priority) => (
              <option key={priority} value={priority}>
                {labels.priority[priority]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={pending}
            className="bg-accent px-5 py-3 rounded-xl font-semibold text-sm hover:bg-accent/90 transition disabled:opacity-60"
          >
            {labels.taskCreate}
          </button>
        </div>
      </form>

      <div className="grid gap-6 lg:grid-cols-3">
        {STATUS_ORDER.map((status) => {
          const column = tasks
            .filter((task) => task.status === status)
            .sort((a, b) => {
              const weight = PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority);
              return weight !== 0 ? weight : a.createdAt.getTime() - b.createdAt.getTime();
            });

          return (
            <section key={status} className="bg-panel/50 rounded-2xl border border-white/5 p-4">
              <h2 className="font-display text-sm uppercase tracking-widest text-white/50 mb-4">
                {labels.status[status]} · {column.length}
              </h2>
              <ul className="space-y-3">
                {column.map((task) => (
                  <li key={task.id} className="bg-ink/60 rounded-xl p-4 border border-white/5">
                    <p className="font-medium mb-1">{task.title}</p>
                    {task.notes && <p className="text-xs text-white/50 mb-2">{task.notes}</p>}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] px-2 py-1 rounded-full border ${PRIORITY_STYLES[task.priority]}`}
                      >
                        {labels.priority[task.priority]}
                      </span>
                      <div className="flex gap-3 text-xs">
                        <button type="button" onClick={() => moveTask(task)} className="text-accent hover:underline">
                          {labels.taskMove}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTask(task)}
                          className="text-white/40 hover:text-rose-400"
                        >
                          {labels.taskDelete}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
