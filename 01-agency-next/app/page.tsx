'use client'
import { useState } from 'react'

const D = {
  es: {
    nav_services:'Servicios', nav_work:'Trabajo', nav_about:'Nosotros', nav_contact:'Contacto', nav_cta:'Hablemos',
    hero_eb:'Agencia digital · Est. 2016', hero_t:'Creamos marcas que dejan huella.', hero_s:'Estrategia, diseño y desarrollo para empresas que quieren crecer con propósito. De la idea al producto, de principio a fin.',
    hero_c1:'Ver proyectos', hero_c2:'Conócemos',
    srv_title:'Servicios', srv_sub:'Un equipo multidisciplinar para cada etapa.',
    s1:'Brand Identity', s1d:'Naming, identidad visual y sistemas de marca.',
    s2:'Product Design', s2d:'UX/UI, prototipado y design systems.',
    s3:'Web Development', s3d:'Sitios y apps con React, Next.js y performance.',
    s4:'Growth', s4d:'SEO, analytics y campañas de conversión.',
    work_title:'Trabajo seleccionado', work_sub:'Proyectos recientes con resultados medibles.',
    w1:'Fintech Rebrand', w1d:'Identidad y plataforma para app bancaria.',
    w2:'E-commerce Beauty', w2d:'Tienda headless +120% en conversión.',
    w3:'SaaS Dashboard', w3d:'Diseño de producto B2B.',
    about_title:'Pensamos, diseñamos y construimos.', about_p:'Un equipo de 24 mentes inquietas en CDMX y Madrid. Colaboramos con founders y empresas globales para convertir ideas en productos que la gente ama usar.',
    stat1:'Proyectos', stat2:'Clientes', stat3:'Premios',
    cont_title:'Hablemos de tu proyecto.', cont_sub:'Respuesta en menos de 24h.', cont_cta:'Enviar mensaje',
    ph:'Tu mensaje...'
  },
  en: {
    nav_services:'Services', nav_work:'Work', nav_about:'About', nav_contact:'Contact', nav_cta:"Let's talk",
    hero_eb:'Digital agency · Est. 2016', hero_t:'We create brands that leave a mark.', hero_s:'Strategy, design and development for companies that want to grow with purpose. From idea to product, end to end.',
    hero_c1:'View projects', hero_c2:'About us',
    srv_title:'Services', srv_sub:'A multidisciplinary team for every stage.',
    s1:'Brand Identity', s1d:'Naming, visual identity and brand systems.',
    s2:'Product Design', s2d:'UX/UI, prototyping and design systems.',
    s3:'Web Development', s3d:'Sites and apps with React, Next.js and performance.',
    s4:'Growth', s4d:'SEO, analytics and conversion campaigns.',
    work_title:'Selected work', work_sub:'Recent projects with measurable results.',
    w1:'Fintech Rebrand', w1d:'Identity and platform for a banking app.',
    w2:'Beauty E-commerce', w2d:'Headless store +120% conversion.',
    w3:'SaaS Dashboard', w3d:'B2B product design.',
    about_title:'We think, design and build.', about_p:'A team of 24 restless minds in CDMX and Madrid. We partner with founders and global companies to turn ideas into products people love.',
    stat1:'Projects', stat2:'Clients', stat3:'Awards',
    cont_title:"Let's talk about your project.", cont_sub:'Reply within 24h.', cont_cta:'Send message',
    ph:'Your message...'
  }
}

export default function Page() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const t = (k: any) => (D as any)[lang][k]
  return (
    <main>
      {/* Nav */}
      <header className="fixed top-0 w-full z-50 backdrop-blur bg-ink/70 border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a className="font-display text-xl tracking-widest"><span className="text-candy">NEBULA</span> STUDIO</a>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#services" className="hover:text-candy transition">{t('nav_services')}</a>
            <a href="#work" className="hover:text-candy transition">{t('nav_work')}</a>
            <a href="#about" className="hover:text-candy transition">{t('nav_about')}</a>
            <a href="#contact" className="hover:text-candy transition">{t('nav_contact')}</a>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => setLang(lang==='es'?'en':'es')} className="text-xs px-3 py-1.5 rounded-full border border-candy/40 hover:bg-candy/10 transition">{lang==='es'?'EN':'ES'}</button>
            <a href="#contact" className="bg-candy px-5 py-2 rounded-full text-sm font-semibold hover:bg-candy/90 transition">{t('nav_cta')}</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-candy/10 via-transparent to-aqua/10 pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <p className="text-candy tracking-[.3em] text-xs mb-4 uppercase">{t('hero_eb')}</p>
            <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">{t('hero_t')}</h1>
            <p className="text-pearl/70 text-lg max-w-xl mb-8">{t('hero_s')}</p>
            <div className="flex gap-4">
              <a href="#work" className="bg-candy px-7 py-3 rounded-full font-semibold hover:bg-candy/90 transition">{t('hero_c1')}</a>
              <a href="#about" className="border border-pearl/30 px-7 py-3 rounded-full hover:bg-pearl/5 transition">{t('hero_c2')}</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden ring-1 ring-white/10">
              <img src="https://images.unsplash.com/photo-1496171418884-4ae77353e622?auto=format&fit=crop&w=900&q=80" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl mb-3">{t('srv_title')}</h2>
          <p className="text-pearl/60">{t('srv_sub')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ['s1','s1d'],['s2','s2d'],['s3','s3d'],['s4','s4d']
          ].map(([a,b]) => (
            <div key={a} className="bg-panel p-7 rounded-2xl border border-white/5 hover:border-candy/40 transition">
              <h3 className="font-display text-xl mb-2 text-candy">{t(a)}</h3>
              <p className="text-pearl/60 text-sm">{t(b)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 bg-panel/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl mb-3">{t('work_title')}</h2>
            <p className="text-pearl/60">{t('work_sub')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            { [
              { key:'w1', img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80' },
              { key:'w2', img:'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=700&q=80' },
              { key:'w3', img:'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=700&q=80' }
            ].map(({key,img}) => (
              <article key={key} className="group rounded-2xl overflow-hidden border border-white/5">
                <div className="overflow-hidden"><img src={img} className="h-52 w-full object-cover group-hover:scale-105 transition duration-500"/></div>
                <div className="p-5 bg-panel">
                  <h3 className="font-display text-xl">{t(key)}</h3>
                  <p className="text-pearl/60 text-sm">{t(key+'d')}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="font-display text-4xl mb-6">{t('about_title')}</h2>
          <p className="text-pearl/70 leading-relaxed mb-8">{t('about_p')}</p>
          <div className="flex gap-10">
            <div><p className="font-display text-3xl text-candy">180+</p><p className="text-xs text-pearl/60 uppercase tracking-widest">{t('stat1')}</p></div>
            <div><p className="font-display text-3xl text-candy">45</p><p className="text-xs text-pearl/60 uppercase tracking-widest">{t('stat2')}</p></div>
            <div><p className="font-display text-3xl text-candy">12</p><p className="text-xs text-pearl/60 uppercase tracking-widest">{t('stat3')}</p></div>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" className="rounded-3xl object-cover w-full h-80"/>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-candy/5 border-y border-candy/20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl mb-2">{t('cont_title')}</h2>
            <p className="text-pearl/60">{t('cont_sub')}</p>
          </div>
          <form className="grid gap-4 bg-ink/60 p-8 rounded-3xl border border-white/5">
            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-candy" placeholder="Nombre"/>
            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-candy" placeholder="Email"/>
            <textarea rows={4} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-candy" placeholder={t('ph')}/>
            <button type="button" className="bg-candy py-3 rounded-xl font-semibold hover:bg-candy/90 transition">{t('cont_cta')}</button>
          </form>
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-xs text-pearl/40">
        © 2026 Nebula Studio · Portfolio demo
      </footer>
    </main>
  )
}
