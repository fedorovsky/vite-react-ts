import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/desktop-api': {
        target: 'https://desktop.plarium.name',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/desktop-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.url);
          });
        },
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.url);
          });
        },
      },
    },
  },
});
