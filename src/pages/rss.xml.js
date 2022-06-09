import rss from '@astrojs/rss';

const postImportResult = import.meta.globEager('./blog/**/*.md');
const posts = Object.values(postImportResult);

// Generate an RSS feed from this collection of posts.
export const get = () =>
	rss({
		title: 'Stefen’s Blog',
		description: 'My thoughts on web development and sometimes other things.',
		site: import.meta.env.SITE,
		customData: `<language>en-us</language>`,
		items: posts.map((item) => ({
			title: item.frontmatter.title,
			description: item.frontmatter.description,
			link: item.url,
			pubDate: item.frontmatter.publishDate
		}))
	});
