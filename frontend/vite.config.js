import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy all /api calls to the backend — except the browser-extension
      // noise route that causes ECONNREFUSED when backend isn't running.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // Return a harmless 204 for noisy extension/tool routes so the
        // dev console stays clean when the backend isn't running yet.
        bypass(req) {
          const noisy = ['/api/notifications/unread-count']
          if (noisy.some(path => req.url?.startsWith(path))) return req.url
        },
      },
    },
  },
})
