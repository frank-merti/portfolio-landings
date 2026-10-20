export const content = {
  es: {
    nav_feat: 'Características',
    nav_specs: 'Specs',
    nav_reviews: 'Reseñas',
    nav_buy: 'Comprar',
    hero_eb: 'Aether H1 · Audífonos premium',
    hero_t: 'Sonido que te envuelve, silencio que te libera.',
    hero_s: 'Cancelación activa de ruido de última generación, 40 h de batería y un sonido tan preciso que redescubres tus canciones.',
    hero_c1: 'Comprar ahora',
    hero_c2: 'Explorar',
    hero_note: 'Envío gratis · Garantía 2 años',
    feat_title: 'Diseñados para escuchar más.',
    feat_sub: 'Cada detalle pensado para la experiencia.',
    f1: 'ANC adaptativa',
    f1d: 'Se ajusta en tiempo real al entorno.',
    f2: '40h batería',
    f2d: 'Carga rápida: 10 min = 5 horas.',
    f3: 'Drivers 40mm',
    f3d: 'Bajos profundos, medios claros, agudos nítidos.',
    f4: 'Modo transparencia',
    f4d: 'Escucha el mundo sin quitártelos.',
    spec_title: 'Especificaciones',
    color_title: 'Elige tu color',
    reviews_title: 'Lo que dicen',
    buy_title: 'Llévalo hoy',
    buy_sub: '3 cuotas sin interés o envío gratis.',
    buy_cta: 'Añadir al carrito',
    buy_price: '$5,499 MXN',
    cart: 'Carrito',
    added: '¡Agregado!',
    qty: 'Cantidad',
    col_black: 'Negro obsidiana',
    col_bone: 'Hueso',
    col_brass: 'Latón',
    ft: '© 2026 Aether · MIT License'
  },
  en: {
    nav_feat: 'Features',
    nav_specs: 'Specs',
    nav_reviews: 'Reviews',
    nav_buy: 'Buy',
    hero_eb: 'Aether H1 · Premium headphones',
    hero_t: 'Sound that surrounds you, silence that frees you.',
    hero_s: 'Next-gen active noise cancellation, 40h battery and sound so precise you rediscover your songs.',
    hero_c1: 'Buy now',
    hero_c2: 'Explore',
    hero_note: 'Free shipping · 2-year warranty',
    feat_title: 'Designed to listen more.',
    feat_sub: 'Every detail crafted for the experience.',
    f1: 'Adaptive ANC',
    f1d: 'Adjusts in real time to your surroundings.',
    f2: '40h battery',
    f2d: 'Fast charge: 10 min = 5 hours.',
    f3: '40mm drivers',
    f3d: 'Deep bass, clear mids, crisp highs.',
    f4: 'Transparency mode',
    f4d: 'Hear the world without taking them off.',
    spec_title: 'Specifications',
    color_title: 'Choose your color',
    reviews_title: 'What people say',
    buy_title: 'Take it home today',
    buy_sub: '3 installments interest-free or free shipping.',
    buy_cta: 'Add to cart',
    buy_price: '$279 USD',
    cart: 'Cart',
    added: 'Added!',
    qty: 'Quantity',
    col_black: 'Obsidian black',
    col_bone: 'Bone',
    col_brass: 'Brass',
    ft: '© 2026 Aether · MIT License'
  }
};

export const specs = [
  ['Driver', '40mm dynamic'],
  ['Frequency', '5 Hz – 40 kHz'],
  ['ANC', 'Adaptive, 45dB max'],
  ['Battery', '40 h (ANC off) / 30 h (ANC on)'],
  ['Charge', 'USB-C, 10 min = 5 h'],
  ['Bluetooth', '5.3, multipoint 2 devices'],
  ['Weight', '265 g'],
  ['Codecs', 'LDAC, AAC, SBC']
];

export const featureKeys = ['f1', 'f2', 'f3', 'f4'];
export const colorKeys = ['black', 'bone', 'brass'];

export const colorImages = {
  black: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80',
  bone: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=700&q=80',
  brass: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'
};

export const colorSwatches = {
  black: '#1a1714',
  bone: '#e8dfd0',
  brass: '#c9893b'
};

export function translate(language, key) {
  return content[language]?.[key] ?? key;
}
