import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        configureServer(server) {
            server.middlewares.unshift((req, res, next) => {
                if (req.url.startsWith('/admin') && !req.url.match(/\.[^/]+$/)) {
                    req.url = '/admin/index.html';
                } else if (req.url && req.url.endsWith('/')) {
                    req.url = req.url.slice(0, -1);
                }
                next();
            });
        },
    },
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
        },
    },
});
