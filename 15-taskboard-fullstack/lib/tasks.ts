export const TASK_STATUSES = ['todo', 'doing', 'done'] as const;
export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type Task = {
  id: string;
  title: string;
  notes: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
};

export function isTaskStatus(value: string): value is TaskStatus {
  return (TASK_STATUSES as readonly string[]).includes(value);
}

export function isTaskPriority(value: string): value is TaskPriority {
  return (TASK_PRIORITIES as readonly string[]).includes(value);
}

export function nextStatus(status: TaskStatus): TaskStatus {
  const index = TASK_STATUSES.indexOf(status);
  return TASK_STATUSES[(index + 1) % TASK_STATUSES.length];
}

const PRIORITY_WEIGHT: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };

export function sortByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const weight = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
    return weight !== 0 ? weight : a.createdAt.getTime() - b.createdAt.getTime();
  });
}

export function groupByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  const groups: Record<TaskStatus, Task[]> = { todo: [], doing: [], done: [] };
  for (const task of tasks) {
    groups[task.status].push(task);
  }
  return {
    todo: sortByPriority(groups.todo),
    doing: sortByPriority(groups.doing),
    done: sortByPriority(groups.done)
  };
}

export function countByStatus(tasks: Task[]): Record<TaskStatus, number> {
  return tasks.reduce<Record<TaskStatus, number>>(
    (acc, task) => {
      acc[task.status] += 1;
      return acc;
    },
    { todo: 0, doing: 0, done: 0 }
  );
}

export type TaskRow = {
  id: string;
  title: string;
  notes: string | null;
  status: string;
  priority: string;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toTask(row: TaskRow): Task {
  return {
    ...row,
    status: isTaskStatus(row.status) ? row.status : 'todo',
    priority: isTaskPriority(row.priority) ? row.priority : 'medium'
  };
}
