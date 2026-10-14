import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Flowboard — Gestión de proyectos para equipos modernos', description: 'Organiza, colabora y entrega más rápido.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>
}
