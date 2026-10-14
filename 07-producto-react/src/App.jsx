import { useState } from 'react'

const D = {
 es: {
  nav_feat:'Características', nav_specs:'Specs', nav_reviews:'Reseñas', nav_buy:'Comprar',
  hero_eb:'Aether H1 · Audífonos premium', hero_t:'Sonido que te envuelve, silencio que te libera.', hero_s:'Cancelación activa de ruido de última generación, 40 h de batería y un sonido tan preciso que redescubres tus canciones.',
  hero_c1:'Comprar ahora', hero_c2:'Explorar', hero_note:'Envío gratis · Garantía 2 años',
  feat_title:'Diseñados para escuchar más.', feat_sub:'Cada detalle pensado para la experiencia.',
  f1:'ANC adaptativa', f1d:'Se ajusta en tiempo real al entorno.',
  f2:'40h batería', f2d:'Carga rápida: 10 min = 5 horas.',
  f3:'Drivers 40mm', f3d:'Bajos profundos, medios claros, agudos nítidos.',
  f4:'Modo transparencia', f4d:'Escucha el mundo sin quitártelos.',
  spec_title:'Especificaciones', color_title:'Elige tu color', reviews_title:'Lo que dicen',
  buy_title:'Llévalo hoy', buy_sub:'3 cuotas sin interés o envío gratis.', buy_cta:'Añadir al carrito', buy_price:'$5,499 MXN',
  cart:'Carrito', added:'¡Agregado!', qty:'Cantidad', col_black:'Negro obsidiana', col_bone:'Hueso', col_brass:'Latón',
  ft:'© 2026 Aether · Portfolio demo'
 },
 en: {
  nav_feat:'Features', nav_specs:'Specs', nav_reviews:'Reviews', nav_buy:'Buy',
  hero_eb:'Aether H1 · Premium headphones', hero_t:'Sound that surrounds you, silence that frees you.', hero_s:'Next-gen active noise cancellation, 40h battery and sound so precise you rediscover your songs.',
  hero_c1:'Buy now', hero_c2:'Explore', hero_note:'Free shipping · 2-year warranty',
  feat_title:'Designed to listen more.', feat_sub:'Every detail crafted for the experience.',
  f1:'Adaptive ANC', f1d:'Adjusts in real time to your surroundings.',
  f2:'40h battery', f2d:'Fast charge: 10 min = 5 hours.',
  f3:'40mm drivers', f3d:'Deep bass, clear mids, crisp highs.',
  f4:'Transparency mode', f4d:'Hear the world without taking them off.',
  spec_title:'Specifications', color_title:'Choose your color', reviews_title:'What people say',
  buy_title:'Take it home today', buy_sub:'3 installments interest-free or free shipping.', buy_cta:'Add to cart', buy_price:'$279 USD',
  cart:'Cart', added:'Added!', qty:'Quantity', col_black:'Obsidian black', col_bone:'Bone', col_brass:'Brass',
  ft:'© 2026 Aether · Portfolio demo'
 }
}

const SPECS = [
 ['Driver','40mm dynamic'],
 ['Frequency','5 Hz – 40 kHz'],
 ['ANC','Adaptive, 45dB max'],
 ['Battery','40 h (ANC off) / 30 h (ANC on)'],
 ['Charge','USB-C, 10 min = 5 h'],
 ['Bluetooth','5.3, multipoint 2 devices'],
 ['Weight','265 g'],
 ['Codecs','LDAC, AAC, SBC']
]

export default function App() {
 const [lang, setLang] = useState('es')
 const [color, setColor] = useState('black')
 const [qty, setQty] = useState(1)
 const [cart, setCart] = useState(0)
 const [toast, setToast] = useState(false)
 const t = (k) => D[lang][k]
 const colors = {
  black: { name: t('col_black'), img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80', hex:'#1a1714' },
  bone: { name: t('col_bone'), img: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=700&q=80', hex:'#e8dfd0' },
  brass: { name: t('col_brass'), img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80', hex:'#c9893b' }
 }
 const add = () => { setCart(c=>c+qty); setToast(true); setTimeout(()=>setToast(false),2000) }
 return (
  <div>
   <header className="fixed top-0 w-full z-50 backdrop-blur bg-ink/80 border-b border-white/5">
     <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
       <a className="font-display text-2xl tracking-wide text-brass">AETHER</a>
       <div className="hidden md:flex gap-8 text-sm">
         <a href="#features" className="hover:text-brass transition">{t('nav_feat')}</a>
         <a href="#specs" className="hover:text-brass transition">{t('nav_specs')}</a>
         <a href="#reviews" className="hover:text-brass transition">{t('nav_reviews')}</a>
       </div>
       <div className="flex items-center gap-3">
         <button onClick={() => setLang(lang==='es'?'en':'es')} className="text-xs px-3 py-1.5 rounded-full border border-brass/40 hover:bg-brass/10 transition">{lang==='es'?'EN':'ES'}</button>
         <button className="relative text-sm px-3 py-1.5 rounded-full border border-brass/40 hover:bg-brass/10 transition">
           {t('cart')} {cart>0 && <span className="ml-1 bg-brass text-ink rounded-full px-2 py-0.5 text-xs font-bold">{cart}</span>}
         </button>
       </div>
     </nav>
   </header>

   <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-br from-brass/10 via-transparent to-transparent pointer-events-none"/>
     <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
       <div>
         <p className="text-brass tracking-[.3em] text-xs mb-4 uppercase">{t('hero_eb')}</p>
         <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('hero_t')}</h1>
         <p className="text-ash text-lg max-w-xl mb-8">{t('hero_s')}</p>
         <div className="flex flex-wrap gap-4">
           <a href="#buy" className="bg-brass text-ink px-7 py-3 rounded-full font-bold hover:bg-brass/90 transition">{t('hero_c1')}</a>
           <a href="#features" className="border border-ash/30 px-7 py-3 rounded-full hover:bg-ash/5 transition">{t('hero_c2')}</a>
         </div>
         <p className="text-xs text-ash/60 mt-6">{t('hero_note')}</p>
       </div>
       <div>
         <img src={colors[color].img} alt="headphones" className="w-full rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-brass/10 object-cover aspect-square"/>
       </div>
     </div>
   </section>

   <section id="features" className="py-24 max-w-7xl mx-auto px-6">
     <div className="text-center mb-14">
       <h2 className="font-display text-4xl mb-3">{t('feat_title')}</h2>
       <p className="text-ash">{t('feat_sub')}</p>
     </div>
     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {['f1','f2','f3','f4'].map(k => (
         <div key={k} className="bg-white/5 p-7 rounded-2xl border border-white/5 hover:border-brass/40 transition">
           <h3 className="font-display text-xl mb-2 text-brass">{t(k)}</h3>
           <p className="text-ash text-sm">{t(k+'d')}</p>
         </div>
       ))}
     </div>
   </section>

   <section id="specs" className="py-24 bg-white/5">
     <div className="max-w-4xl mx-auto px-6">
       <h2 className="font-display text-4xl text-center mb-10">{t('spec_title')}</h2>
       <div className="grid sm:grid-cols-2 gap-4">
         {SPECS.map(([k,v]) => (
           <div key={k} className="flex justify-between bg-ink/60 rounded-xl px-5 py-3 border border-white/5">
             <span className="text-ash">{k}</span>
             <span className="font-semibold">{v}</span>
           </div>
         ))}
       </div>
     </div>
   </section>

   <section className="py-24 max-w-6xl mx-auto px-6">
     <h2 className="font-display text-4xl text-center mb-10">{t('color_title')}</h2>
     <div className="flex justify-center gap-6">
       {Object.entries(colors).map(([key,c]) => (
         <button key={key} onClick={() => setColor(key)} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition ${color===key?'border-brass bg-brass/10':'border-white/10 hover:border-brass/40'}`}>
           <span className="w-10 h-10 rounded-full ring-2 ring-white/20" style={{background:c.hex}}/>
           <span className="text-xs">{c.name}</span>
         </button>
       ))}
     </div>
   </section>

   <section id="reviews" className="py-24 bg-white/5">
     <div className="max-w-6xl mx-auto px-6">
       <h2 className="font-display text-4xl text-center mb-10">{t('reviews_title')}</h2>
       <div className="grid md:grid-cols-3 gap-6">
         {[
           {q:'"El ANC es espectacular, los uso en vuelos."',a:'— Sofía A.'},
           {q:'"40 horas reales, mejor compra del año."',a:'— Carlos M.'},
           {q:'"El sonido es de audífilo, muy por encima del precio."',a:'— Marina L.'}
         ].map(x => (
           <div key={x.a} className="bg-ink/60 p-7 rounded-2xl border border-white/5">
             <p className="text-cream/80 mb-4">{x.q}</p>
             <p className="text-brass text-sm">{x.a}</p>
           </div>
         ))}
       </div>
     </div>
   </section>

   <section id="buy" className="py-24 text-center">
     <h2 className="font-display text-4xl mb-3">{t('buy_title')}</h2>
     <p className="text-ash mb-4">{t('buy_sub')}</p>
     <p className="font-display text-4xl text-brass mb-6">{t('buy_price')}</p>
     <div className="flex justify-center items-center gap-3 mb-6">
       <span className="text-sm">{t('qty')}</span>
       <div className="flex border border-white/10 rounded-full overflow-hidden">
         <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="px-4 py-1 hover:bg-white/5">−</button>
         <span className="px-4 py-1">{qty}</span>
         <button onClick={()=>setQty(q=>q+1)} className="px-4 py-1 hover:bg-white/5">+</button>
       </div>
     </div>
     <button onClick={add} className="bg-brass text-ink px-10 py-4 rounded-full font-bold text-lg hover:bg-brass/90 transition">{t('buy_cta')}</button>
     {toast && <p className="mt-4 text-brass text-sm">{t('added')} ({qty})</p>}
   </section>

   <footer className="py-10 border-t border-white/5 text-center text-xs text-ash/50">{t('ft')}</footer>
  </div>
 )
}
