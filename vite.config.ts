import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

function normalizeBasePath(basePath: string) {
  if (basePath === '/') {
    return basePath
  }

  const prefixed = basePath.startsWith('/') ? basePath : `/${basePath}`
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`
}

const basePath = normalizeBasePath(process.env.VITE_BASE_PATH ?? '/')

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,json,ico,png,webmanifest}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
