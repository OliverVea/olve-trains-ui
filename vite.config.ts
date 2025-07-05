import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  root: '.',
  plugins: [svelte()],
  build: {
    outDir: 'public/dist',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
