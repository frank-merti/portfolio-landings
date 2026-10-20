'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  faqKeys,
  featureKeys,
  planKeys,
  translate,
  type ContentKey,
  type Language
} from '@/lib/content';

export default function Page() {
  const [lang, setLang] = useState<Language>('es');
  const t = (key: ContentKey) => translate(lang, key);

  const plans = [
    { key: 'pl1' as ContentKey, price: 'pr1' as ContentKey, description: 'pd1' as ContentKey, featured: false },
    { key: 'pl2' as ContentKey, price: 'pr2' as ContentKey, description: 'pd2' as ContentKey, featured: true },
    { key: 'pl3' as ContentKey, price: 'pr3' as ContentKey, description: 'pd3' as ContentKey, featured: false }
  ];

  const testimonials = [
    { quote: '"Flowboard cambió cómo coordinamos sprints."', author: '— Ana Ríos, PM' },
    { quote: '"La migración desde Jira tomó solo 2 días."', author: '— Carlos Mena, CTO' },
    { quote: '"Nuestro throughput subió 40% en un mes."', author: '— Sofía Andrade, Founder' }
  ];

  return (
    <main>
      <header className="fixed top-0 w-full z-50 backdrop-blur bg-ink/70 border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a className="font-display text-xl tracking-widest text-lime">FLOWBOARD</a>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#features" className="hover:text-lime transition">{t('nav_feat')}</a>
            <a href="#pricing" className="hover:text-lime transition">{t('nav_price')}</a>
            <a href="#faq" className="hover:text-lime transition">{t('nav_faq')}</a>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="text-xs px-3 py-1.5 rounded-full border border-lime/40 hover:bg-lime/10 transition"
              aria-label="Change language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a href="#cta" className="bg-lime text-ink px-5 py-2 rounded-full text-sm font-bold hover:bg-lime/90 transition">
              {t('nav_cta')}
            </a>
          </div>
        </nav>
      </header>

      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lime/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center w-full">
          <p className="text-lime tracking-[.3em] text-xs mb-4 uppercase">{t('hero_eb')}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">{t('hero_t')}</h1>
          <p className="text-pearl/70 text-lg max-w-2xl mx-auto mb-8">{t('hero_s')}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="#cta" className="bg-lime text-ink px-8 py-3 rounded-full font-bold hover:bg-lime/90 transition">
              {t('hero_c1')}
            </a>
            <a href="#features" className="border border-pearl/30 px-8 py-3 rounded-full hover:bg-pearl/5 transition">
              {t('hero_c2')}
            </a>
          </div>
          <p className="text-xs text-pearl/50">{t('hero_note')}</p>
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-lime/10">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
              alt="Flowboard product dashboard"
              className="w-full"
              width={1200}
              height={750}
              priority
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl mb-3">{t('feat_title')}</h2>
          <p className="text-pearl/60">{t('feat_sub')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureKeys.map((key) => (
            <div key={key} className="bg-card p-7 rounded-2xl border border-white/5 hover:border-lime/40 transition">
              <h3 className="font-display text-xl mb-2 text-lime">{t(key)}</h3>
              <p className="text-pearl/60 text-sm">{t(`${key}d` as ContentKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24 bg-card/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl mb-3">{t('price_title')}</h2>
            <p className="text-pearl/60">{t('price_sub')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`rounded-2xl p-8 border ${
                  plan.featured
                    ? 'bg-lime text-ink border-lime scale-105 shadow-2xl shadow-lime/20'
                    : 'bg-card border-white/5'
                }`}
              >
                {plan.featured && (
                  <p className="text-xs font-bold uppercase tracking-widest mb-2 text-ink/70">Recomendado</p>
                )}
                <h3 className="font-display text-2xl mb-2">{t(plan.key)}</h3>
                <p className="text-3xl font-bold mb-4">{t(plan.price)}</p>
                <p className={`text-sm mb-6 ${plan.featured ? 'text-ink/70' : 'text-pearl/60'}`}>
                  {t(plan.description)}
                </p>
                <button
                  type="button"
                  className={`w-full py-3 rounded-full font-bold transition ${
                    plan.featured
                      ? 'bg-ink text-lime hover:bg-ink/90'
                      : 'border border-lime text-lime hover:bg-lime/10'
                  }`}
                >
                  {t('nav_cta')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl mb-3">{t('test_title')}</h2>
          <p className="text-pearl/60">{t('test_sub')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.author} className="bg-card p-7 rounded-2xl border border-white/5">
              <p className="text-pearl/80 mb-4">{item.quote}</p>
              <p className="text-lime text-sm">{item.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="py-24 bg-card/40">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {faqKeys.map((question) => {
              const answer = question.replace('q', 'a') as ContentKey;
              return (
                <details key={question} className="bg-card rounded-2xl border border-white/5 p-5">
                  <summary className="cursor-pointer font-semibold">{t(question)}</summary>
                  <p className="text-pearl/60 text-sm mt-3">{t(answer)}</p>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cta" className="py-24 text-center">
        <h2 className="font-display text-4xl mb-3">{t('cta_title')}</h2>
        <p className="text-pearl/60 mb-6">{t('cta_sub')}</p>
        <a
          href="#"
          className="bg-lime text-ink px-8 py-4 rounded-full font-bold text-lg hover:bg-lime/90 transition inline-block"
        >
          {t('cta_btn')}
        </a>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-xs text-pearl/40">{t('ft')}</footer>
    </main>
  );
}
