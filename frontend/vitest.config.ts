import { defineConfig, configDefaults } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const configPath = resolve(dirname(fileURLToPath(import.meta.url)), 'svelte.config.js');

export default defineConfig({
  root: dirname(fileURLToPath(import.meta.url)),
  plugins: [svelte({ configFile: configPath })],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: new URL('./vitest.setup.ts', import.meta.url).pathname,
    include: ['tests/**/*.test.ts'],
    exclude: [...configDefaults.exclude, '../e2e-tests/**'],
  },
});
