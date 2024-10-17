import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-react-ts/',

  plugins: [react(), sentryVitePlugin({
    org: "plarium-play",
    project: "vire-react-ts"
  }), sentryVitePlugin({
    org: "plarium-play",
    project: "vite-react-ts"
  })],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: true
  }
});