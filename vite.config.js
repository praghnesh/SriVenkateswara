import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api-postal': {
        target: 'https://api.postalpincode.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-postal/, '')
      }
    }
  }
});
