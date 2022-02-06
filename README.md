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
