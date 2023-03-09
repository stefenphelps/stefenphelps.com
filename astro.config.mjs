import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import { astroImageTools } from 'astro-imagetools';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import critters from 'astro-critters';
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
	site: 'https://stefenphelps.com/',
	trailingSlash: 'always',
	markdown: {
		shikiConfig: {
			theme: 'material-darker'
		}
	},
	integrations: [
		sitemap(),
		astroImageTools,
		compress({
			css: true,
			html: true,
			js: true,
			img: false,
			svg: false
		}),
		critters(),
		prefetch(),
		AstroPWA({
			base: '/',
			scope: '/',
			includeAssets: ['fonts/*.woff2', '*.{png,ico,svg,jpg,xml}'],
			manifest: {
				name: 'Stefen Phelps',
				short_name: 'Stefen',
				description:
					"Stefen's Personal website where he writes about web development and sometimes other things.",
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
			},
			workbox: {
				navigateFallback: null,
				globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,avif,jpeg}']
			},
			devOptions: {
				enabled: true
			}
		})
	]
});
