'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  articles,
  experience,
  projects,
  skills,
  translate,
  type ContentKey,
  type Language
} from '@/lib/content';

const NAV = ['about', 'skills', 'projects', 'exp', 'contact'] as const;

export default function Page() {
  const [lang, setLang] = useState<Language>('es');
  const t = (key: ContentKey) => translate(lang, key);

  return (
    <main>
      <header className="fixed top-0 w-full z-50 backdrop-blur bg-void/70 border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a className="font-display text-xl tracking-widest">
            <span className="text-indigo">F M</span>
          </a>
          <div className="hidden md:flex gap-7 text-sm">
            {NAV.map((section) => (
              <a key={section} href={`#${section}`} className="hover:text-indigo transition">
                {t(`nav_${section}` as ContentKey)}
              </a>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="text-xs px-3 py-1.5 rounded-full border border-indigo/40 hover:bg-indigo/10 transition"
              aria-label="Change language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a href="#contact" className="bg-indigo px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo/90 transition">
              {t('nav_contact')}
            </a>
          </div>
        </nav>
      </header>

      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo/20 via-transparent to-mint/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <p className="text-indigo tracking-[.3em] text-xs mb-4 uppercase">{t('hero_eb')}</p>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">{t('hero_t')}</h1>
            <p className="text-pearl/70 text-lg max-w-xl mb-8">{t('hero_s')}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="#projects" className="bg-indigo px-7 py-3 rounded-full font-semibold hover:bg-indigo/90 transition">
                {t('hero_c1')}
              </a>
              <a href="#contact" className="border border-pearl/30 px-7 py-3 rounded-full hover:bg-pearl/5 transition">
                {t('hero_c2')}
              </a>
            </div>
            <p className="text-xs text-pearl/50">{t('hero_note')}</p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden ring-1 ring-white/10">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
                alt="Developer working with a team"
                className="w-full h-full object-cover"
                width={900}
                height={900}
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-panel/90 backdrop-blur px-4 py-2 rounded-2xl border border-indigo/30 text-xs text-pearl/70">
              React · Next.js · Tailwind
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="font-display text-4xl mb-6">{t('about_title')}</h2>
        <p className="text-pearl/70 leading-relaxed text-lg">{t('about_p')}</p>
      </section>

      <section id="skills" className="py-24 bg-panel/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-3">{t('skills_title')}</h2>
            <p className="text-pearl/60">{t('skills_sub')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2 rounded-full bg-panel/80 border border-white/5 text-sm hover:border-indigo/50 hover:text-indigo transition cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-3">{t('projects_title')}</h2>
          <p className="text-pearl/60">{t('projects_sub')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group bg-panel rounded-2xl overflow-hidden border border-white/5 hover:border-indigo/40 transition"
            >
              <div className={`h-36 bg-gradient-to-br ${project.gradient} opacity-80`} />
              <div className="p-6">
                <h3 className="font-display text-xl mb-1">{project.title}</h3>
                <p className="text-pearl/60 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="text-xs px-3 py-1 rounded-full bg-white/5 text-pearl/70">
                      {technology}
                    </span>
                  ))}
                </div>
                <a href={project.href} className="text-sm text-indigo hover:text-mint transition">
                  {t('view_project')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="exp" className="py-24 bg-panel/40">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-3">{t('exp_title')}</h2>
            <p className="text-pearl/60">{t('exp_sub')}</p>
          </div>
          <div className="space-y-8">
            {experience.map((entry) => (
              <div key={entry.role} className="relative pl-8 border-l-2 border-indigo/30">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo" />
                <p className="font-display text-lg">{entry.role}</p>
                <p className="text-indigo text-sm">
                  {entry.company} · {entry.period}
                </p>
                <p className="text-pearl/60 text-sm mt-2">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl mb-3">{t('blog_title')}</h2>
          <p className="text-pearl/60">{t('blog_sub')}</p>
        </div>
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.title}
              className="bg-panel rounded-2xl p-5 border border-white/5 flex items-center justify-between hover:border-indigo/40 transition cursor-pointer"
            >
              <span className="font-display">{article.title}</span>
              <span className="text-xs text-pearl/50">{article.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-24 bg-indigo/5 border-y border-indigo/20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl mb-2">{t('contact_title')}</h2>
            <p className="text-pearl/60">{t('contact_sub')}</p>
          </div>
          <form className="grid gap-4 bg-void/60 p-8 rounded-3xl border border-white/5">
            <input
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo"
              placeholder="Nombre"
              name="name"
              autoComplete="name"
            />
            <input
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo"
              placeholder="Email"
              name="email"
              type="email"
              autoComplete="email"
            />
            <textarea
              rows={4}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo"
              placeholder="Tu mensaje..."
              name="message"
            />
            <button type="submit" className="bg-indigo py-3 rounded-xl font-semibold hover:bg-indigo/90 transition">
              {t('contact_cta')}
            </button>
          </form>
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-xs text-pearl/40">{t('ft')}</footer>
    </main>
  );
}
