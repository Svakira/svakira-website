import { defineConfig } from 'vite'

export default defineConfig({
  base: '/svakira-website/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
