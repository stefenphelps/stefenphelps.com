import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';
import { astroImageTools } from 'astro-imagetools';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import critters from 'astro-critters';

// https://astro.build/config
export default defineConfig({
	site: 'https://stefenphelps.com/',
	trailingSlash: 'always',
	vite: {
		plugins: [
			VitePWA({
				strategies: 'generateSW',
				workbox: {
					globPatterns: ['**/*.{js,css}'],
					navigateFallback: null
				},
				manifest: {
					name: 'Stefen Phelps',
					short_name: 'Stefen',
					description: "Stefen's Personal website where he writes about web development and sometimes other things.",
					start_url: 'https://stefenphelps.com',
					theme_color: '#473b2c',
					background_color: '#473b2c',
					display: 'standalone',
					icons: [
						{
							src: '/pwa-192x192.png',
							sizes: '192x192',
							type: 'image/png'
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png'
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'any maskable'
						}
					]
				}
			})
		]
	},
	markdown: {
		syntaxHighlight: 'prism'
	},
	integrations: [sitemap(), astroImageTools, compress(), critters()]
});
