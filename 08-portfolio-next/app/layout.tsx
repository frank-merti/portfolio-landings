import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frank-merti.github.io/portfolio-landings/08-portfolio-next';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Francisco M. — Desarrollador Full-Stack',
    template: '%s | Francisco M.'
  },
  description: 'Portafolio de proyectos web, aplicaciones de consola y casos de estudio con React, Next.js, Tailwind, Java y Python.',
  keywords: ['portfolio', 'full-stack developer', 'react', 'next.js', 'tailwind', 'java', 'python'],
  authors: [{ name: 'Francisco Merti' }],
  creator: 'Francisco Merti',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'Francisco M.',
    title: 'Francisco M. — Desarrollador Full-Stack',
    description: 'Portafolio de proyectos web y aplicaciones de consola.',
    images: [{ url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Francisco Merti' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Francisco M. — Desarrollador Full-Stack',
    description: 'Portafolio de proyectos web y aplicaciones de consola.'
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
