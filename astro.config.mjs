import { defineConfig, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://stefenphelps.com/',
	trailingSlash: 'always',
	compressHTML: false,
	markdown: {
		shikiConfig: {
			theme: 'material-theme-darker'
		}
	},
	integrations: [sitemap()],
	prefetch: {
		defaultStrategy: 'viewport'
	}
});
