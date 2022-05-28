import { defineConfig } from 'astro-imagetools/config';

export default defineConfig({
	placeholder: 'blurred',
	format: ['webp', 'jpg'],
	fallbackFormat: 'png'
});
