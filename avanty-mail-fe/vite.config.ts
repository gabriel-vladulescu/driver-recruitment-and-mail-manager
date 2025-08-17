import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers/index.ts', import.meta.url)),
      '/src': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  root: 'public',
  publicDir: false,
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: fileURLToPath(new URL('./public/index.html', import.meta.url))
    }
  }
})