import { useState } from 'react';
import {
  colorImages,
  colorKeys,
  colorSwatches,
  featureKeys,
  specs,
  translate
} from './content.js';

const testimonials = [
  { quote: '"El ANC es espectacular, los uso en vuelos."', author: '— Sofía A.' },
  { quote: '"40 horas reales, mejor compra del año."', author: '— Carlos M.' },
  { quote: '"El sonido es de audífilo, muy por encima del precio."', author: '— Marina L.' }
];

export default function App() {
  const [lang, setLang] = useState('es');
  const [color, setColor] = useState('black');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState(false);
  const t = (key) => translate(lang, key);

  const add = () => {
    setCart((current) => current + qty);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

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
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="text-xs px-3 py-1.5 rounded-full border border-brass/40 hover:bg-brass/10 transition"
              aria-label="Change language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              className="relative text-sm px-3 py-1.5 rounded-full border border-brass/40 hover:bg-brass/10 transition"
              aria-label={t('cart')}
            >
              {t('cart')}{' '}
              {cart > 0 && <span className="ml-1 bg-brass text-ink rounded-full px-2 py-0.5 text-xs font-bold">{cart}</span>}
            </button>
          </div>
        </nav>
      </header>

      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brass/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <p className="text-brass tracking-[.3em] text-xs mb-4 uppercase">{t('hero_eb')}</p>
            <h1 className="font-display text-5xl md:text-6xl leading-tight mb-6">{t('hero_t')}</h1>
            <p className="text-ash text-lg max-w-xl mb-8">{t('hero_s')}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#buy" className="bg-brass text-ink px-7 py-3 rounded-full font-bold hover:bg-brass/90 transition">
                {t('hero_c1')}
              </a>
              <a href="#features" className="border border-ash/30 px-7 py-3 rounded-full hover:bg-ash/5 transition">
                {t('hero_c2')}
              </a>
            </div>
            <p className="text-xs text-ash/60 mt-6">{t('hero_note')}</p>
          </div>
          <div>
            <img
              src={colorImages[color]}
              alt={`Aether H1 — ${t(`col_${color}`)}`}
              className="w-full rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-brass/10 object-cover aspect-square"
              width={700}
              height={700}
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl mb-3">{t('feat_title')}</h2>
          <p className="text-ash">{t('feat_sub')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureKeys.map((key) => (
            <div key={key} className="bg-white/5 p-7 rounded-2xl border border-white/5 hover:border-brass/40 transition">
              <h3 className="font-display text-xl mb-2 text-brass">{t(key)}</h3>
              <p className="text-ash text-sm">{t(`${key}d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="specs" className="py-24 bg-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-4xl text-center mb-10">{t('spec_title')}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {specs.map(([key, value]) => (
              <div key={key} className="flex justify-between bg-ink/60 rounded-xl px-5 py-3 border border-white/5">
                <span className="text-ash">{key}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="font-display text-4xl text-center mb-10">{t('color_title')}</h2>
        <div className="flex justify-center gap-6">
          {colorKeys.map((key) => (
            <button
              key={key}
              onClick={() => setColor(key)}
              aria-pressed={color === key}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition ${
                color === key ? 'border-brass bg-brass/10' : 'border-white/10 hover:border-brass/40'
              }`}
            >
              <span className="w-10 h-10 rounded-full ring-2 ring-white/20" style={{ background: colorSwatches[key] }} />
              <span className="text-xs">{t(`col_${key}`)}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="reviews" className="py-24 bg-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-4xl text-center mb-10">{t('reviews_title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.author} className="bg-ink/60 p-7 rounded-2xl border border-white/5">
                <p className="text-cream/80 mb-4">{item.quote}</p>
                <p className="text-brass text-sm">{item.author}</p>
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
            <button
              onClick={() => setQty((current) => Math.max(1, current - 1))}
              className="px-4 py-1 hover:bg-white/5"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-1">{qty}</span>
            <button
              onClick={() => setQty((current) => current + 1)}
              className="px-4 py-1 hover:bg-white/5"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <button onClick={add} className="bg-brass text-ink px-10 py-4 rounded-full font-bold text-lg hover:bg-brass/90 transition">
          {t('buy_cta')}
        </button>
        {toast && <p className="mt-4 text-brass text-sm">{t('added')} ({qty})</p>}
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-xs text-ash/50">{t('ft')}</footer>
    </div>
  );
}
