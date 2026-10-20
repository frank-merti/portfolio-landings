'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BoardForm({ labels }: { labels: { name: string; description: string; submit: string } }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: String(form.get('name') ?? ''),
        description: String(form.get('description') ?? '')
      })
    });

    setPending(false);
    setOpen(false);
    event.currentTarget.reset();

    if (response.ok) {
      router.refresh();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-accent px-5 py-2 rounded-full font-semibold text-sm hover:bg-accent/90 transition"
      >
        {labels.submit}
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 w-full max-w-md">
      <input
        name="name"
        required
        minLength={2}
        placeholder={labels.name}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
      />
      <input
        name="description"
        placeholder={labels.description}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent px-5 py-2 rounded-full font-semibold text-sm hover:bg-accent/90 transition disabled:opacity-60"
        >
          {labels.submit}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-5 py-2 rounded-full text-sm border border-white/15 hover:bg-white/5 transition"
        >
          ×
        </button>
      </div>
    </form>
  );
}
