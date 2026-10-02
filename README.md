# Stefen Phelps' Personal Website

## Site Structure

My site contains the following folders:

```
/
├── public/
├── src/
│   ├── components/
│   └── pages/
│   └── styles/
│   └── scripts/
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. If the page has brackets in it's name it's a [dynamic route](https://docs.astro.build/en/core-concepts/routing/).

`src/components/` is where I put anything that I want to re-use inside pages. All client side JS is put into the `scripts` folder.

All global styles are in `styles`. Individual page or component styles are in each page or component file inside `<style>` tags.

## Structured Data

`src/components/StructuredData.astro` generates a server-rendered JSON-LD graph through `src/Base.astro`. Every content page includes linked `Person`, `WebSite`, and page entities, with breadcrumbs on subpages. The home and about pages use `ProfilePage`; contact uses `ContactPage`; the HTML Entity Copier includes a `WebApplication`.

Blog posts receive `BlogPosting` markup from their existing frontmatter, including the author, publication date, categories, and hero image when provided. Blog archive pages use `CollectionPage`, `Blog`, and an `ItemList` containing only the posts displayed on that page. Canonical URLs and schema IDs use the production origin and trailing slashes, including for paginated archives and local previews.

New pages using `Base.astro` automatically receive basic markup. Pass `pageType` for a specific page type, `post` for a blog entry, or `posts` and `listStart` for a paginated listing. Use `structuredData={false}` for error pages, as the 404 page does. Update the shared person data if the job title, employer, or linked social profiles change. Modification dates, ratings, and other unavailable facts are deliberately omitted.

Validate changes with `npm run check` and `npm run build`, then inspect the rendered JSON-LD in `dist`. Public URLs can also be checked with the [Schema.org Validator](https://validator.schema.org/) and [Google Rich Results Test](https://search.google.com/test/rich-results).
