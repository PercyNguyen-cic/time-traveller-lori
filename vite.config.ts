import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite plugin that serves static files from the root `/assets/` directory
 * in dev mode, and copies them to `dist/assets/` during build so Neocities
 * deployment receives all transparent PNGs and game assets.
 */
function serveRootAssets(): Plugin {
  return {
    name: 'serve-root-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/')) {
          const cleanUrl = req.url.split('?')[0].split('#')[0];
          const relativePath = decodeURIComponent(cleanUrl.slice('/assets/'.length));
          const filePath = path.resolve(__dirname, 'assets', relativePath);

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.gif': 'image/gif',
              '.svg': 'image/svg+xml',
              '.webp': 'image/webp',
              '.mp3': 'audio/mpeg',
              '.wav': 'audio/wav',
              '.ogg': 'audio/ogg',
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const srcAssets = path.resolve(__dirname, 'assets');
      const distAssets = path.resolve(__dirname, 'dist', 'assets');
      if (fs.existsSync(srcAssets)) {
        fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), serveRootAssets()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
