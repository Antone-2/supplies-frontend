import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {}
  },
  server: {
    proxy: {
      // Forward all requests starting with /api to backend server running on port 5000
      '/api': {
  target: 'https://api.medhelmsupplies.co.ke', // <-- change to your backend domain
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // optional, you can skip if no path change needed
      },
    },
  },
});