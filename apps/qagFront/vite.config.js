// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		deps: {
			inline: ['msw']
		}
	},
	resolve: {
		alias: {
			$msw: path.resolve('src/mocks')
		}
	}
};

export default config;
