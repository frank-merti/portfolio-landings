import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
import { getDictionary, getLanguage } from '@/lib/i18n';

export default function LoginPage() {
  const language = getLanguage();
  const t = getDictionary(language);

  return (
    <main className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-display text-3xl mb-2">{t.auth_login_title}</h1>
      <p className="text-white/60 mb-8">{t.auth_login_subtitle}</p>
      <AuthForm
        mode="login"
        labels={{
          email: t.auth_email,
          password: t.auth_password,
          name: t.auth_name,
          submit: t.auth_submit_login,
          error: t.error_generic
        }}
      />
      <p className="text-sm text-white/60 mt-6">
        {t.auth_no_account}{' '}
        <Link href="/register" className="text-accent hover:underline">
          {t.nav_register}
        </Link>
      </p>
    </main>
  );
}
