import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import { getDictionary, getLanguage } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Taskboard — Un tablero, cero caos',
  description:
    'Taskboard: crea tableros, organiza tareas por estado y prioridad y trabaja con tu equipo en tiempo real.',
  keywords: ['taskboard', 'kanban', 'productividad', 'next.js', 'prisma'],
  authors: [{ name: 'Francisco Merti' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const language = getLanguage();
  const t = getDictionary(language);

  return (
    <html lang={language}>
      <body className="min-h-screen bg-ink text-pearl antialiased">
        <Nav />
        {children}
        <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40">{t.footer}</footer>
      </body>
    </html>
  );
}
