import Link from 'next/link';
import { getDictionary, getLanguage } from '@/lib/i18n';
import { getCurrentUser } from '@/lib/session';
import LanguageToggle from './LanguageToggle';
import LogoutButton from './LogoutButton';

export default async function Nav() {
  const language = getLanguage();
  const t = getDictionary(language);
  const user = await getCurrentUser();

  return (
    <header className="border-b border-white/5 bg-ink/80 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-widest">
          <span className="text-accent">TASK</span>BOARD
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <Link href="/boards" className="hover:text-accent transition">
                {t.nav_boards}
              </Link>
              <LogoutButton label={t.nav_logout} />
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-accent transition">
                {t.nav_login}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-full bg-accent font-semibold hover:bg-accent/90 transition"
              >
                {t.nav_register}
              </Link>
            </>
          )}
          <LanguageToggle language={language} />
        </div>
      </nav>
    </header>
  );
}
