import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.APP_PORT, 10),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '/src': fileURLToPath(new URL('./src', import.meta.url))
    }
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