import { Options } from 'tsup';
import { defineConfig } from 'tsup';
const shared = {
	entry: ['src/index.ts'],
	platform: 'node',
	external: ['discord.js', 'mongoose'],
	clean: true,
	minify: true,
} satisfies Options;

export default defineConfig([
	{
		format: 'esm',
		target: 'node16',
		outDir: './dist/esm',
		treeshake: true,
		outExtension() {
			return {
				js: '.mjs',
			};
		},
		...shared,
	},
	{
		format: 'cjs',
		splitting: false,
		target: 'node16',
		outDir: './dist/cjs',
		outExtension() {
			return {
				js: '.cjs',
			};
		},
		...shared,
	},
	{
		outDir: './dist/types',
		dts: { only: true },
		...shared,
	},
]);
