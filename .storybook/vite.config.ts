import path from 'node:path';
import { defineConfig } from 'vite';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		tsconfigPaths({ loose: true }),
		vueI18n({
			include: [path.resolve(__dirname, '../i18n/locales/*.json')],
		}),
	],
	resolve: {
		alias: {
			// TODO: For some reason CJS version is loaded instead of ESM
			// The requested module '/node_modules/@intlify/shared/index.js?v=cd3e1327' does not provide an export named 'assign'
			'@intlify/shared': '@intlify/shared/dist/shared.mjs',
		},
	},
});
