// vite.config.ts
import { defineConfig } from 'vite';
import { svelte }    from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  // ▶︎ look for index.html here:
  root: '.',

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
  },
});
