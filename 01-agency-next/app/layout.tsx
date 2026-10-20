import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frank-merti.github.io/portfolio-landings/01-agency-next';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nebula Studio — Agencia digital creativa',
    template: '%s | Nebula Studio'
  },
  description: 'Diseñamos marcas, productos y experiencias digitales de alto impacto.',
  keywords: ['agencia digital', 'branding', 'product design', 'desarrollo web', 'Next.js'],
  authors: [{ name: 'Francisco Merti' }],
  creator: 'Francisco Merti',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'Nebula Studio',
    title: 'Nebula Studio — Agencia digital creativa',
    description: 'Diseñamos marcas, productos y experiencias digitales de alto impacto.',
    images: [{ url: 'https://images.unsplash.com/photo-1496171418884-4ae77353e622?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Nebula Studio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nebula Studio — Agencia digital creativa',
    description: 'Diseñamos marcas, productos y experiencias digitales de alto impacto.'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
