'use client'
import { useState } from 'react'

const D:any = {
 es: {
  nav_about:'Sobre mí', nav_skills:'Skills', nav_projects:'Proyectos', nav_exp:'Experiencia', nav_contact:'Contacto',
  hero_eb:'Hola, soy Francisco 👋', hero_t:'Desarrollador Full-Stack creando experiencias digitales.', hero_s:'Especializado en React, Next.js, Tailwind y Node. Construyo productos web rápidos, accesibles y hermosos.',
  hero_c1:'Ver proyectos', hero_c2:'Contactar', hero_note:'Disponible para proyectos freelance y full-time',
  about_title:'Sobre mí', about_p:'Soy desarrollador apasionado por el diseño y el código. Me gusta unir UX/UI con arquitecturas sólidas. He construido landing pages, dashboards, e-commerce headless y apps móviles. Trabajo con React, Next.js, Tailwind, Node y bases de datos SQL/NoSQL.',
  skills_title:'Stack técnico', skills_sub:'Herramientas con las que construyo día a día.',
  projects_title:'Proyectos destacados', projects_sub:'Una selección de landings y apps que he desarrollado.',
  exp_title:'Experiencia', exp_sub:'Mi trayectoria profesional.',
  blog_title:'Blog & Artículos', blog_sub:'Lo que comparto con la comunidad.',
  contact_title:'Trabajemos juntos', contact_sub:'Envíame un mensaje y te respondo en 24h.', contact_cta:'Enviar mensaje',
  ft:'© 2026 Francisco M. · Portfolio demo'
 },
 en: {
  nav_about:'About', nav_skills:'Skills', nav_projects:'Projects', nav_exp:'Experience', nav_contact:'Contact',
  hero_eb:"Hi, I'm Francisco 👋", hero_t:'Full-Stack Developer crafting digital experiences.', hero_s:'Specialized in React, Next.js, Tailwind and Node. I build fast, accessible and beautiful web products.',
  hero_c1:'View projects', hero_c2:'Contact', hero_note:'Open to freelance and full-time opportunities',
  about_title:'About me', about_p:'I am a developer passionate about design and code. I love merging UX/UI with solid architectures. I have built landing pages, dashboards, headless e-commerce and mobile apps. I work with React, Next.js, Tailwind, Node and SQL/NoSQL databases.',
  skills_title:'Tech stack', skills_sub:'Tools I build with every day.',
  projects_title:'Featured projects', projects_sub:'A selection of landings and apps I have developed.',
  exp_title:'Experience', exp_sub:'My professional journey.',
  blog_title:'Blog & Articles', blog_sub:'What I share with the community.',
  contact_title:"Let's work together", contact_sub:'Send me a message and I reply within 24h.', contact_cta:'Send message',
  ft:'© 2026 Francisco M. · Portfolio demo'
 }
}

const PROJECTS = [
 { title:'Nebula Studio', desc:'Agencia digital creativa con identidad de marca y web en Next.js.', tech:['Next.js','Tailwind','TypeScript'], color:'from-pink-500 to-rose-500', link:'../01-agency-next' },
 { title:'Flowboard', desc:'SaaS de gestión de proyectos: kanban, docs, automatizaciones y pricing.', tech:['Next.js','Tailwind'], color:'from-lime-400 to-emerald-500', link:'../02-saas-next' },
 { title:'La Brasa', desc:'Landing de restaurante de fuego con menú y reservas bilingüe.', tech:['HTML','Tailwind CDN'], color:'from-orange-500 to-amber-500', link:'../03-restaurante' },
 { title:'IronForge Gym', desc:'Gimnasio moderno: programas, planes y entrenadores.', tech:['HTML','Tailwind CDN'], color:'from-lime-400 to-green-600', link:'../04-gimnasio' },
 { title:'Altura Homes', desc:'Bienes raíces premium con catálogo de propiedades.', tech:['HTML','Tailwind CDN'], color:'from-amber-400 to-yellow-600', link:'../05-inmobiliaria' },
 { title:'DevConf 2026', desc:'Landing de conferencia tech: speakers, agenda y tickets.', tech:['HTML','Tailwind CDN'], color:'from-cyan-400 to-violet-500', link:'../06-evento' },
 { title:'Aether H1', desc:'Audífonos premium con ANC: React + Vite, selector de color y carrito.', tech:['React','Vite','Tailwind'], color:'from-amber-600 to-stone-700', link:'../07-producto-react' }
]

const SKILLS = ['React','Next.js','TypeScript','Tailwind CSS','Node.js','Express','PostgreSQL','MongoDB','Docker','Git','Figma','REST/GraphQL']
const EXP = [
 { role:'Full-Stack Developer', company:'Agencia Nebula', period:'2023 — Presente', desc:'Desarrollo de landings y apps para clientes fintech, e-commerce y SaaS.' },
 { role:'Frontend Developer', company:'Startup Flowboard', period:'2021 — 2023', desc:'UI/UX, design system y migración a Next.js.' },
 { role:'Junior Developer', company:'Freelance', period:'2019 — 2021', desc:'Sitios web y pequeñas apps para PYMES.' }
]
const BLOG = [
 { title:'Cómo empecé con Next.js App Router', date:'Oct 2026' },
 { title:'Tailwind tips para landings memorables', date:'Sep 2026' },
 { title:'Accesibilidad en componentes React', date:'Aug 2026' }
]

export default function Page() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const t = (k:any) => D[lang][k]
  return (
    <main>
      <header className="fixed top-0 w-full z-50 backdrop-blur bg-void/70 border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a className="font-display text-xl tracking-widest"><span className="text-indigo">F M</span></a>
          <div className="hidden md:flex gap-7 text-sm">
            {['about','skills','projects','exp','contact'].map(k => (
              <a key={k} href={`#${k}`} className="hover:text-indigo transition">{t('nav_'+k)}</a>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => setLang(lang==='es'?'en':'es')} className="text-xs px-3 py-1.5 rounded-full border border-indigo/40 hover:bg-indigo/10 transition">{lang==='es'?'EN':'ES'}</button>
            <a href="#contact" className="bg-indigo px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo/90 transition">{t('nav_contact')}</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo/20 via-transparent to-mint/10 pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <p className="text-indigo tracking-[.3em] text-xs mb-4 uppercase">{t('hero_eb')}</p>
            <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">{t('hero_t')}</h1>
            <p className="text-pearl/70 text-lg max-w-xl mb-8">{t('hero_s')}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="#projects" className="bg-indigo px-7 py-3 rounded-full font-semibold hover:bg-indigo/90 transition">{t('hero_c1')}</a>
              <a href="#contact" className="border border-pearl/30 px-7 py-3 rounded-full hover:bg-pearl/5 transition">{t('hero_c2')}</a>
            </div>
            <p className="text-xs text-pearl/50">{t('hero_note')}</p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden ring-1 ring-white/10">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80" className="w-full h-full object-cover"/>
            </div>
            <div className="absolute -top-4 -right-4 bg-panel/90 backdrop-blur px-4 py-2 rounded-2xl border border-indigo/30 text-xs text-pearl/70">
              React · Next.js · Tailwind
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="font-display text-4xl mb-6">{t('about_title')}</h2>
        <p className="text-pearl/70 leading-relaxed text-lg">{t('about_p')}</p>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 bg-panel/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-3">{t('skills_title')}</h2>
            <p className="text-pearl/60">{t('skills_sub')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map(s => (
              <span key={s} className="px-5 py-2 rounded-full bg-panel/80 border border-white/5 text-sm hover:border-indigo/50 hover:text-indigo transition cursor-default">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-3">{t('projects_title')}</h2>
          <p className="text-pearl/60">{t('projects_sub')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map(p => (
            <article key={p.title} className="group bg-panel rounded-2xl overflow-hidden border border-white/5 hover:border-indigo/40 transition">
              <div className={`h-36 bg-gradient-to-br ${p.color} opacity-80`}/>
              <div className="p-6">
                <h3 className="font-display text-xl mb-1">{p.title}</h3>
                <p className="text-pearl/60 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map(tg => <span key={tg} className="text-xs px-3 py-1 rounded-full bg-white/5 text-pearl/70">{tg}</span>)}
                </div>
                <a href={p.link} className="text-sm text-indigo hover:text-mint transition">Ver proyecto →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="exp" className="py-24 bg-panel/40">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-3">{t('exp_title')}</h2>
            <p className="text-pearl/60">{t('exp_sub')}</p>
          </div>
          <div className="space-y-8">
            {EXP.map(e => (
              <div key={e.role} className="relative pl-8 border-l-2 border-indigo/30">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo"/>
                <p className="font-display text-lg">{e.role}</p>
                <p className="text-indigo text-sm">{e.company} · {e.period}</p>
                <p className="text-pearl/60 text-sm mt-2">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl mb-3">{t('blog_title')}</h2>
          <p className="text-pearl/60">{t('blog_sub')}</p>
        </div>
        <div className="space-y-4">
          {BLOG.map(b => (
            <div key={b.title} className="bg-panel rounded-2xl p-5 border border-white/5 flex items-center justify-between hover:border-indigo/40 transition cursor-pointer">
              <span className="font-display">{b.title}</span>
              <span className="text-xs text-pearl/50">{b.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-indigo/5 border-y border-indigo/20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl mb-2">{t('contact_title')}</h2>
            <p className="text-pearl/60">{t('contact_sub')}</p>
          </div>
          <form className="grid gap-4 bg-void/60 p-8 rounded-3xl border border-white/5">
            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo" placeholder="Nombre"/>
            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo" placeholder="Email"/>
            <textarea rows={4} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo" placeholder="Tu mensaje..."/>
            <button type="button" className="bg-indigo py-3 rounded-xl font-semibold hover:bg-indigo/90 transition">{t('contact_cta')}</button>
          </form>
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-xs text-pearl/40">{t('ft')}</footer>
    </main>
  )
}
