'use client';

import { useRouter } from 'next/navigation';
import { LANGUAGE_COOKIE } from '@/lib/constants';

export default function LanguageToggle({ language }: { language: 'es' | 'en' }) {
  const router = useRouter();

  const toggle = () => {
    const next = language === 'es' ? 'en' : 'es';
    document.cookie = `${LANGUAGE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="text-xs px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/5 transition"
      aria-label="Change language"
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
