import { defineConfig } from 'astro-imagetools/config';

export default defineConfig({
	placeholder: 'blurred',
	format: ['avif', 'webp'],
	fallbackFormat: 'jpg'
});
