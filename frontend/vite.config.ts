// vite.config.ts
import { defineConfig } from 'vite';
import { svelte }    from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // ▶︎ look for index.html here:
  root: rootDir,

  // ▶︎ serve everything in `public/` at `/…`
  publicDir: 'public',

  plugins: [svelte()],

  server: {
    open: true,
    port: 5173,
  },

  build: {
    // ▶︎ emit the prod build into public/dist
    outDir: 'public/dist',
    // ▶︎ clear only public/dist, not your style.css
    emptyOutDir: true,
    manifest: 'manifest.json',
    rollupOptions: {
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: 'chunk-[hash].js',
        assetFileNames: '[name]-[hash][extname]'
      }
    }
  },
});
