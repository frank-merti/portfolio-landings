'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Mode = 'login' | 'register';

export default function AuthForm({
  mode,
  labels
}: {
  mode: Mode;
  labels: {
    email: string;
    password: string;
    name: string;
    submit: string;
    error: string;
  };
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload: Record<string, string> = {
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? '')
    };
    if (mode === 'register') {
      payload.name = String(form.get('name') ?? '');
    }

    const response = await fetch(`/api/auth/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setPending(false);
      setError(labels.error);
      return;
    }

    router.push('/boards');
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 bg-panel/70 p-8 rounded-3xl border border-white/5">
      {mode === 'register' && (
        <input
          name="name"
          required
          minLength={2}
          placeholder={labels.name}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
        />
      )}
      <input
        name="email"
        type="email"
        required
        placeholder={labels.email}
        autoComplete="email"
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
      />
      <input
        name="password"
        type="password"
        required
        minLength={mode === 'register' ? 8 : 1}
        placeholder={labels.password}
        autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
      />
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="bg-accent py-3 rounded-xl font-semibold hover:bg-accent/90 transition disabled:opacity-60"
      >
        {labels.submit}
      </button>
    </form>
  );
}
