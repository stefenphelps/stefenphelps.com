import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';
import { astroImageTools } from 'astro-imagetools';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
	site: 'https://stefenphelps.com/',
	trailingSlash: 'always',
	vite: {
		plugins: [VitePWA()]
	},
	markdown: {
		syntaxHighlight: 'prism'
	},
	integrations: [sitemap(), critters(), astroImageTools, compress()]
});
