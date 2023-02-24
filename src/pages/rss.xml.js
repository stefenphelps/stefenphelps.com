import rss from "@astrojs/rss";

const postImportResult = import.meta.globEager("./blog/**/*.md");
const posts = Object.values(postImportResult);
const sortedPosts = posts.sort(
  (a, b) =>
    new Date(b.frontmatter.publishDate).valueOf() -
    new Date(a.frontmatter.publishDate).valueOf()
);

// Generate an RSS feed from this collection of posts.
export const get = () =>
  rss({
    title: "Stefen’s Blog",
    description: "My thoughts on web development and sometimes other things.",
    site: import.meta.env.SITE,
    customData: `<language>en-us</language>`,
    items: sortedPosts.map((item) => ({
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      link: item.url,
      pubDate: item.frontmatter.publishDate,
    })),
    stylesheet: "/rss/styles.xsl",
  });
