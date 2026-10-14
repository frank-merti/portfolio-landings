import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Nebula Studio — Agencia digital creativa',
  description: 'Diseñamos marcas, productos y experiencias digitales de alto impacto.'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es"><body>{children}</body></html>
  )
}
