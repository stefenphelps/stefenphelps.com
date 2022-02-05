import { VitePWA } from 'vite-plugin-pwa';

export default {
	projectRoot: '.', // Where to resolve all URLs relative to. Useful if you have a monorepo project.
	pages: './src/pages', // Path to Astro components, pages, and data
	dist: './dist', // When running `astro build`, path to final static output
	public: './public', // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
	buildOptions: {
		site: 'https://stefenphelps.com/',
		sitemap: true
	},
	devOptions: {
		hostname: 'localhost',
		port: 3000,
		trailingSlash: 'always'
	},
	vite: {
		plugins: [
			VitePWA({
				includeAssets: [
					'/favicon.ico',
					'/robots.txt',
					'/apple-touch-icon.png',
					'/mustaches/*.svg'
				],
				manifest: {
					name: 'Stefen Phelps',
					short_name: 'Stefen',
					description:
						"Stefen's Personal website where he writes about web development and sometimes other things.",
					start_url: '/',
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
	}
};
