import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Francisco M. — Desarrollador Full-Stack', description: 'Portafolio de proyectos web y aplicaciones.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>
}
