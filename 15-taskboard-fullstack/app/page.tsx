import Link from 'next/link';
import { getDictionary, getLanguage } from '@/lib/i18n';
import { getCurrentUser } from '@/lib/session';

export default async function HomePage() {
  const language = getLanguage();
  const t = getDictionary(language);
  const user = await getCurrentUser();

  const features = [
    { title: t.f1, body: t.f1d },
    { title: t.f2, body: t.f2d },
    { title: t.f3, body: t.f3d },
    { title: t.f4, body: t.f4d }
  ];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-24 relative">
          <p className="text-accent tracking-[.3em] text-xs uppercase mb-4">Next.js · Prisma · SQLite</p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight max-w-3xl mb-6">{t.hero_title}</h1>
          <p className="text-white/70 text-lg max-w-2xl mb-10">{t.hero_subtitle}</p>
          <div className="flex flex-wrap gap-4">
            {user ? (
              <Link
                href="/boards"
                className="bg-accent px-7 py-3 rounded-full font-semibold hover:bg-accent/90 transition"
              >
                {t.nav_boards}
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="bg-accent px-7 py-3 rounded-full font-semibold hover:bg-accent/90 transition"
                >
                  {t.hero_cta}
                </Link>
                <Link
                  href="/login"
                  className="border border-white/20 px-7 py-3 rounded-full hover:bg-white/5 transition"
                >
                  {t.hero_secondary}
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl mb-8">{t.features_title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-panel p-6 rounded-2xl border border-white/5">
              <h3 className="font-display text-lg text-accent mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
