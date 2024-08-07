import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: "automatic"
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    },
    port: 3000
  }
})