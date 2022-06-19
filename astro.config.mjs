import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';
import { astroImageTools } from 'astro-imagetools';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
export default defineConfig({
	site: 'https://stefenphelps.com/',
	vite: {
		plugins: [
			VitePWA({
				includeAssets: ['/mustaches/*.svg'],
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
				}
			})
		]
	},
	markdown: {
		syntaxHighlight: 'prism'
	},
	integrations: [
		sitemap(),
		critters(),
		astroImageTools,
		NetlifyCMS({
			config: {
				backend: {
					name: 'git-gateway',
					branch: 'main'
				},
				collections: [
					{
						name: 'posts',
						label: 'Blog Posts',
						folder: 'src/pages/blog',
						create: true,
						delete: true,
						fields: [
							{ name: 'title', widget: 'string', label: 'Post Title' },
							{ name: 'body', widget: 'markdown', label: 'Post Body' }
						]
					}
				]
			}
		})
	]
});
