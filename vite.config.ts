import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': { NODE_ENV: mode }
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Forward all requests starting with /api to backend server running on port 5000
      '/api': {
        target: process.env.NODE_ENV === 'production'
          ? 'https://backend.medhelmsupplies.co.ke'
          : 'http://localhost:5000', // local backend for development
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  preview: {
    port: 4173,
    host: true
  }
}));
