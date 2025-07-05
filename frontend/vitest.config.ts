import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const configPath = resolve(
	dirname(fileURLToPath(import.meta.url)),
	"svelte.config.js",
);

export default defineConfig({
	plugins: [svelte({ configFile: configPath })],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: new URL("./vitest.setup.ts", import.meta.url).pathname,
	},
});
