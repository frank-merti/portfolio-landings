'use client'
import { useState } from 'react'

const D:any = {
 es: { nav_feat:'Funciones', nav_price:'Precios', nav_faq:'FAQ', nav_cta:'Prueba gratis',
  hero_eb:'Flowboard · SaaS de productividad', hero_t:'Menos caos, más entrega.', hero_s:'La plataforma que unifica tareas, docs y automatizaciones para que tu equipo entregue al doble de rapidez.',
  hero_c1:'Empieza gratis', hero_c2:'Ver demo', hero_note:'Sin tarjeta · 14 días gratis',
  feat_title:'Todo lo que tu equipo necesita', feat_sub:'Un solo espacio de trabajo para planear, ejecutar y medir.',
  f1:'Tableros kanban', f1d:'Sprints, backlogs y dependencias con drag & drop.',
  f2:'Docs colaborativos', f2d:'Escribe en tiempo real con comentarios y versiones.',
  f3:'Automatizaciones', f3d:'Reglas sin código para tareas repetitivas.',
  f4:'Reportes', f4d:'Burndown, velocidad y productividad por equipo.',
  price_title:'Precios simples', price_sub:'Paga por lo que usas, escala sin fricción.',
  pl1:'Personal', pl2:'Team', pl3:'Empresa',
  pr1:'$0 /mes', pr2:'$12 /usuario/mes', pr3:'Custom',
  pd1:'Para probar Flowboard sin límites.', pd2:'Para equipos en crecimiento.', pd3:'Para organizaciones grandes.',
  test_title:'Amado por equipos', test_sub:'Más de 4.000 organizaciones confían en nosotros.',
  q1:'¿Tiene prueba gratuita?', a1:'Sí, 14 días con todas las funciones, sin tarjeta.',
  q2:'¿Puedo migrar mis datos?', a2:'Sí, importamos desde Jira, Asana, Trello y Notion.',
  q3:'¿Hay descuentos para educación?', a3:'Sí, planes gratuitos para estudiantes y ONGs.',
  q4:'¿Mis datos están seguros?', a4:'Cifrado en reposo y tránsito, SOC2 y GDPR.',
  cta_title:'Listo para ordenar el caos?', cta_sub:'Crea tu espacio en 2 minutos.', cta_btn:'Crear cuenta gratis',
  ft:'© 2026 Flowboard · Portfolio demo'
 },
 en: { nav_feat:'Features', nav_price:'Pricing', nav_faq:'FAQ', nav_cta:'Try free',
  hero_eb:'Flowboard · Productivity SaaS', hero_t:'Less chaos, more delivery.', hero_s:'The platform unifying tasks, docs and automations so your team ships twice as fast.',
  hero_c1:'Start free', hero_c2:'Watch demo', hero_note:'No card · 14-day trial',
  feat_title:'Everything your team needs', feat_sub:'One workspace to plan, execute and measure.',
  f1:'Kanban boards', f1d:'Sprints, backlogs and dependencies with drag & drop.',
  f2:'Collaborative docs', f2d:'Write in real time with comments and versions.',
  f3:'Automations', f3d:'No-code rules for repetitive tasks.',
  f4:'Reports', f4d:'Burndown, velocity and team productivity.',
  price_title:'Simple pricing', price_sub:'Pay for what you use, scale without friction.',
  pl1:'Personal', pl2:'Team', pl3:'Enterprise',
  pr1:'$0 /mo', pr2:'$12 /user/mo', pr3:'Custom',
  pd1:'To try Flowboard with no limits.', pd2:'For growing teams.', pd3:'For large organizations.',
  test_title:'Loved by teams', test_sub:'4,000+ organizations trust us.',
  q1:'Is there a free trial?', a1:'Yes, 14 days with all features, no card.',
  q2:'Can I migrate my data?', a2:'Yes, we import from Jira, Asana, Trello and Notion.',
  q3:'Discounts for education?', a3:'Yes, free plans for students and NGOs.',
  q4:'Is my data safe?', a4:'Encrypted at rest and in transit, SOC2 and GDPR.',
  cta_title:'Ready to tame the chaos?', cta_sub:'Create your workspace in 2 minutes.', cta_btn:'Create free account',
  ft:'© 2026 Flowboard · Portfolio demo'
 }
}

export default function Page() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const t = (k:any) => D[lang][k]
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
            <button onClick={() => setLang(lang==='es'?'en':'es')} className="text-xs px-3 py-1.5 rounded-full border border-lime/40 hover:bg-lime/10 transition">{lang==='es'?'EN':'ES'}</button>
            <a href="#cta" className="bg-lime text-ink px-5 py-2 rounded-full text-sm font-bold hover:bg-lime/90 transition">{t('nav_cta')}</a>
          </div>
        </nav>
      </header>

      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lime/5 to-transparent pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-6 text-center w-full">
          <p className="text-lime tracking-[.3em] text-xs mb-4 uppercase">{t('hero_eb')}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">{t('hero_t')}</h1>
          <p className="text-pearl/70 text-lg max-w-2xl mx-auto mb-8">{t('hero_s')}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="#cta" className="bg-lime text-ink px-8 py-3 rounded-full font-bold hover:bg-lime/90 transition">{t('hero_c1')}</a>
            <a href="#features" className="border border-pearl/30 px-8 py-3 rounded-full hover:bg-pearl/5 transition">{t('hero_c2')}</a>
          </div>
          <p className="text-xs text-pearl/50">{t('hero_note')}</p>
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-lime/10">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" className="w-full"/>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl mb-3">{t('feat_title')}</h2>
          <p className="text-pearl/60">{t('feat_sub')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['f1','f2','f3','f4'].map(k => (
            <div key={k} className="bg-card p-7 rounded-2xl border border-white/5 hover:border-lime/40 transition">
              <h3 className="font-display text-xl mb-2 text-lime">{t(k)}</h3>
              <p className="text-pearl/60 text-sm">{t(k+'d')}</p>
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
            { [
              { k:'pl1', r:'pr1', d:'pd1', hi:false },
              { k:'pl2', r:'pr2', d:'pd2', hi:true },
              { k:'pl3', r:'pr3', d:'pd3', hi:false }
            ].map(p => (
              <div key={p.k} className={`rounded-2xl p-8 border ${p.hi?'bg-lime text-ink border-lime scale-105 shadow-2xl shadow-lime/20':'bg-card border-white/5'}`}>
                {p.hi && <p className="text-xs font-bold uppercase tracking-widest mb-2 text-ink/70">Recomendado</p>}
                <h3 className="font-display text-2xl mb-2">{t(p.k)}</h3>
                <p className="text-3xl font-bold mb-4">{t(p.r)}</p>
                <p className={`text-sm mb-6 ${p.hi?'text-ink/70':'text-pearl/60'}`}>{t(p.d)}</p>
                <button className={`w-full py-3 rounded-full font-bold transition ${p.hi?'bg-ink text-lime hover:bg-ink/90':'border border-lime text-lime hover:bg-lime/10'}`}>{t('nav_cta')}</button>
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
          {[
            {q:'"Flowboard cambió cómo coordinamos sprints."',a:'— Ana Ríos, PM'},
            {q:'"La migración desde Jira tomó solo 2 días."',a:'— Carlos Mena, CTO'},
            {q:'"Nuestro throughput subió 40% en un mes."',a:'— Sofía Andrade, Founder'}
          ].map(x => (
            <div key={x.a} className="bg-card p-7 rounded-2xl border border-white/5">
              <p className="text-pearl/80 mb-4">{x.q}</p>
              <p className="text-lime text-sm">{x.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="py-24 bg-card/40">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {['q1','q2','q3','q4'].map(q => (
              <details key={q} className="bg-card rounded-2xl border border-white/5 p-5">
                <summary className="cursor-pointer font-semibold">{t(q)}</summary>
                <p className="text-pearl/60 text-sm mt-3">{t(q.replace('q','a'))}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="py-24 text-center">
        <h2 className="font-display text-4xl mb-3">{t('cta_title')}</h2>
        <p className="text-pearl/60 mb-6">{t('cta_sub')}</p>
        <a className="bg-lime text-ink px-8 py-4 rounded-full font-bold text-lg hover:bg-lime/90 transition inline-block">{t('cta_btn')}</a>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-xs text-pearl/40">{t('ft')}</footer>
    </main>
  )
}
