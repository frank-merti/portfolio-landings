import { describe, expect, it } from 'vitest';
import {
  countByStatus,
  groupByStatus,
  isTaskPriority,
  isTaskStatus,
  nextStatus,
  sortByPriority,
  type Task,
  type TaskPriority,
  type TaskStatus
} from './tasks';

function buildTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    title: 'Task',
    notes: null,
    status: 'todo',
    priority: 'medium',
    boardId: 'board-1',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    ...overrides
  };
}

describe('task domain', () => {
  it('validates statuses', () => {
    expect(isTaskStatus('todo')).toBe(true);
    expect(isTaskStatus('done')).toBe(true);
    expect(isTaskStatus('archived')).toBe(false);
  });

  it('validates priorities', () => {
    expect(isTaskPriority('high')).toBe(true);
    expect(isTaskPriority('urgent')).toBe(false);
  });

  it('cycles through the status workflow', () => {
    expect(nextStatus('todo')).toBe('doing');
    expect(nextStatus('doing')).toBe('done');
    expect(nextStatus('done')).toBe('todo');
  });

  it('sorts by priority and keeps creation order for ties', () => {
    const tasks = [
      buildTask({ id: 'a', priority: 'low', createdAt: new Date('2026-01-03') }),
      buildTask({ id: 'b', priority: 'high', createdAt: new Date('2026-01-02') }),
      buildTask({ id: 'c', priority: 'high', createdAt: new Date('2026-01-01') })
    ];

    expect(sortByPriority(tasks).map((task) => task.id)).toEqual(['c', 'b', 'a']);
  });

  it('does not mutate the source list', () => {
    const tasks = [
      buildTask({ id: 'a', priority: 'low' }),
      buildTask({ id: 'b', priority: 'high' })
    ];
    sortByPriority(tasks);
    expect(tasks.map((task) => task.id)).toEqual(['a', 'b']);
  });

  it('groups tasks by status', () => {
    const groups = groupByStatus([
      buildTask({ id: 'a', status: 'todo' }),
      buildTask({ id: 'b', status: 'done' }),
      buildTask({ id: 'c', status: 'todo' })
    ]);

    expect(groups.todo).toHaveLength(2);
    expect(groups.doing).toHaveLength(0);
    expect(groups.done).toHaveLength(1);
  });

  it('counts tasks per status', () => {
    const counts = countByStatus([
      buildTask({ status: 'todo' }),
      buildTask({ status: 'todo' }),
      buildTask({ status: 'doing' })
    ]);

    const expected: Record<TaskStatus, number> = { todo: 2, doing: 1, done: 0 };
    expect(counts).toEqual(expected);
  });

  it('exposes the three supported priorities', () => {
    const priorities: TaskPriority[] = ['low', 'medium', 'high'];
    expect(priorities).toHaveLength(3);
  });
});
