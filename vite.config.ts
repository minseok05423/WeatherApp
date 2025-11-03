import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': '{}',
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
    include: ['buffer', 'crypto-browserify', 'stream-browserify'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
