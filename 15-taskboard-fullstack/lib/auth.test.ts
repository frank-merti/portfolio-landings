import { describe, expect, it } from 'vitest';
import { createSessionToken, hashPassword, verifyPassword } from './auth';

describe('password hashing', () => {
  it('hashes and verifies a password', async () => {
    const stored = await hashPassword('correct horse battery staple');
    expect(await verifyPassword('correct horse battery staple', stored)).toBe(true);
  });

  it('rejects a wrong password', async () => {
    const stored = await hashPassword('correct horse battery staple');
    expect(await verifyPassword('wrong password', stored)).toBe(false);
  });

  it('uses a random salt per hash', async () => {
    const first = await hashPassword('same-password');
    const second = await hashPassword('same-password');
    expect(first).not.toBe(second);
  });

  it('never stores the plain password', async () => {
    const stored = await hashPassword('plain-text-secret');
    expect(stored).not.toContain('plain-text-secret');
    expect(stored.split(':')).toHaveLength(2);
  });

  it('fails safely with a malformed stored value', async () => {
    expect(await verifyPassword('anything', 'not-a-valid-hash')).toBe(false);
  });
});

describe('session tokens', () => {
  it('creates unique high entropy tokens', () => {
    const first = createSessionToken();
    const second = createSessionToken();
    expect(first).toHaveLength(64);
    expect(first).not.toBe(second);
  });
});
