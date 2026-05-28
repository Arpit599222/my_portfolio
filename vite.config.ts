import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'framer-motion': path.resolve(__dirname, 'node_modules/framer-motion/dist/cjs/index.js'),
      'motion-dom': path.resolve(__dirname, 'node_modules/motion-dom/dist/cjs/index.js'),
      'motion-utils': path.resolve(__dirname, 'node_modules/motion-utils/dist/cjs/index.js'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion', 'motion-dom', 'motion-utils'],
          lucide: ['lucide-react']
        },
      },
    },
  },
});
