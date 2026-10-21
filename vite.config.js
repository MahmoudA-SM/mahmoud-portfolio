import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// One HTML page per service, so each has its own title, description and link preview
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        data: resolve(import.meta.dirname, 'data/index.html'),
        websites: resolve(import.meta.dirname, 'websites/index.html'),
        video: resolve(import.meta.dirname, 'video/index.html'),
        notfound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})
