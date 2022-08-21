---
title: 'HubSpot to WordPress Website Migration'
description: "HubSpot is a powerful all-in-one marketing platform. However, if your company isn't taking advantage of all of the marketing tools it's platform offers and just want to cover your basics, you can save a whole lot of money by migrating to WordPress. Migrating a HubSpot COS hosted website to a self-hosted WordPress site consists of 4 basic steps."
publishDate: '2017-06-05'
heroImage: '/images/burkmoreland.com_.webp'
layout: '../../layouts/BlogPost.astro'
author: 'Stefen Phelps'
---

HubSpot is a powerful all-in-one marketing platform. However, if your company isn't taking advantage of all of the marketing tools it's platform offers and just want to cover your basics, you can save a whole lot of money by migrating to WordPress. Migrating a HubSpot COS hosted website to a self-hosted WordPress site consists of 4 basic steps.

## 1\. Develop a Custom WordPress Theme

The first step to migrating a website from HubSpot is to re-create the design of the site in WordPress. The WordPress experience is entirely dependent on how your theme is built. HubSpot has an extremely easy-to-use page editor. By using [Timber](http://timber.github.io/timber/) in combination with [Advanced Custom Fields](https://www.advancedcustomfields.com/), you can have an extremely similar experience (or better) with WordPress.

## 2\. Migrate the HubSpot Forms into a WordPress Forms Plugin

Before we can migrate landing pages, it's important to choose a good WordPress forms plugin. If you're used to HubSpot's drag and drop form builder, then I'd highly recommend [Ninja Forms](https://ninjaforms.com/), [Gravity Forms](http://www.gravityforms.com/), or [WPforms](https://wpforms.com/). They all have their own unique benefits so test them all out and see which one you like best. If you don't need need the drag and drop interface, [Contact Form 7](https://contactform7.com/) works great and gives developers all the control they desire including being able to write almost all the markup themselves. Once you decide which forms plugin is best for you, then you can migrate all the forms over.

## 3\. Migrate the HubSpot Site Pages & Landing Pages to WordPress Pages

Now that you've got your forms migrated, you can migrate each site page and landing page. I usually like to have 1 landing page template and use the default template for all other standard site pages. However, depending on your website's design, you may need more.

## 4\. Migrate the HubSpot Blogs to WordPress Posts

WordPress offers an RSS feed import tool, but unfortunately, HubSpot will only display up to 50 posts in their RSS feeds. So if you have less than 50 blog posts, you should be all set for a 1-click import! If you have more than 50, then you've only got a few options: copy and paste each post by hand, develop a custom migration tool using the HubSpot API, or by [exporting your blog to a CSV using a custom coded blog template](https://www.bluleadz.com/blog/how-to-export-a-hubspot-blog).

In addition to these 4 steps you'll probably want to import all your URL Mappings (redirects), backup all of your files in the HubSpot File Manager (FTP it to your new host), as well as export your contacts and any emails/workflows to a different email provider if you want to keep those.

## Performance Metrics: Before (HubSpot) & After (WordPress)

Here are some performance metrics of a HubSpot COS website (before) and the WordPress site (after) to give you an idea of what's possible and how it compares. For some context, the WordPress site is using [Cloudflare's free CDN](https://www.cloudflare.com/) and a standard hosting plan from [Dreamhost](https://www.dreamhost.com/r.cgi?1029607) (~$100/yr).

![before](/images/webpagetest-burkmoreland-before.webp)
Before

![after](/images/webpagetest-burkmoreland-after.webp)
After

---

Need help with a HubSpot to WordPress migration? [Let's talk](https://stefenphelps.com/contact/).
