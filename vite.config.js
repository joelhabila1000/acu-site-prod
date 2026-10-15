import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allows emulating the library subdomain locally: add
    // "127.0.0.1 library.localhost" to your hosts file and open
    // http://library.localhost:5173. The /library path works without this.
    allowedHosts: ["library.localhost"],
    proxy: {
      '/api': 'http://localhost:4000',
      // Uploaded images and documents are served by the API, not by Vite.
      '/uploads': 'http://localhost:4000',
    },
  },
})
