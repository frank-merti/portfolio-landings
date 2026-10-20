import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frank-merti.github.io/portfolio-landings/02-saas-next';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Flowboard — Gestión de proyectos para equipos modernos',
    template: '%s | Flowboard'
  },
  description: 'Organiza, colabora y entrega más rápido: tareas, docs y automatizaciones en un solo espacio de trabajo.',
  keywords: ['project management', 'kanban', 'saas', 'productividad', 'automatizaciones'],
  authors: [{ name: 'Francisco Merti' }],
  creator: 'Francisco Merti',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'Flowboard',
    title: 'Flowboard — Gestión de proyectos para equipos modernos',
    description: 'Organiza, colabora y entrega más rápido: tareas, docs y automatizaciones en un solo espacio de trabajo.',
    images: [{ url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Flowboard' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowboard — Gestión de proyectos para equipos modernos',
    description: 'Organiza, colabora y entrega más rápido.'
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
