import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

const posts = await getCollection('blog');
const sortedPosts = posts.sort(
  (a, b) =>
    new Date(b.data.publishDate).valueOf() -
    new Date(a.data.publishDate).valueOf()
);

export async function get() {
  const posts = await getCollection('blog');
  return rss({
    title: 'Stefen’s Blog',
    description: 'My thoughts on web development and sometimes other things.',
    site: import.meta.env.SITE,
    customData: `<language>en-us</language>`,
    items: sortedPosts.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      link: `/blog/${item.slug}/`,
      pubDate: item.data.publishDate,
    })),
    stylesheet: '/rss/styles.xsl',
  });
}
