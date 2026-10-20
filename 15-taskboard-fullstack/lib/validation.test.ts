import { describe, expect, it } from 'vitest';
import { boardSchema, loginSchema, registerSchema, taskSchema } from './validation';

describe('validation schemas', () => {
  it('accepts a valid registration payload', () => {
    const parsed = registerSchema.safeParse({
      name: 'Francisco',
      email: 'francisco@example.com',
      password: 'super-secret-123'
    });
    expect(parsed.success).toBe(true);
  });

  it('rejects short passwords and invalid emails', () => {
    expect(
      registerSchema.safeParse({ name: 'F', email: 'not-an-email', password: 'short' }).success
    ).toBe(false);
  });

  it('requires a password on login', () => {
    expect(loginSchema.safeParse({ email: 'a@b.com' }).success).toBe(false);
    expect(loginSchema.safeParse({ email: 'a@b.com', password: 'x' }).success).toBe(true);
  });

  it('applies board defaults', () => {
    const parsed = boardSchema.safeParse({ name: 'Sprint 12' });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.color).toBe('indigo');
    }
  });

  it('rejects boards with a name that is too short', () => {
    expect(boardSchema.safeParse({ name: 'a' }).success).toBe(false);
  });

  it('applies task defaults', () => {
    const parsed = taskSchema.safeParse({ title: 'Write docs' });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.status).toBe('todo');
      expect(parsed.data.priority).toBe('medium');
    }
  });

  it('rejects unsupported task values', () => {
    expect(taskSchema.safeParse({ title: 'Task', priority: 'urgent' }).success).toBe(false);
    expect(taskSchema.safeParse({ title: 'Task', status: 'archived' }).success).toBe(false);
  });
});
