import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { noscriptContact } from './plugins/noscript-contact.ts'

const resumePath = fileURLToPath(new URL('./src/data/hoja-de-vida.json', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), noscriptContact(resumePath)],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'plugins/**/*.test.ts'],
  },
})
