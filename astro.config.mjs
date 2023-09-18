import { defineConfig, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';

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
	integrations: [sitemap(), prefetch()]
});
