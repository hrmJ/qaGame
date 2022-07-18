//..
import { sveltekit } from '@sveltejs/kit/vite';

export default {
	test: {
		environment: 'jsdom',
		setupFiles: ['src/setupTests.ts'],
		globals: true,
		deps: {
			inline: ['msw', 'whatwg-fetch']
		}
	},
	plugins: [sveltekit()]
};
