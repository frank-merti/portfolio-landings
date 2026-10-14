import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const isGhPages = process.env.GITHUB_PAGES === 'true'
const base = isGhPages ? '/portfolio-landings/07-producto-react/' : '/'
export default defineConfig({ plugins: [react()], base })
