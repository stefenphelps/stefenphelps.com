---
title: 'How To Migrate Your HubSpot Blog to WordPress'
description: "HubSpot makes it extremely difficult to export your blog posts in a usable form. It's built-in export tool only exports the page title and URLs. The website export tool exports all the static HTML files. Neither of these are useful when you need to import your data into a WordPress Database."
publishDate: '2018-01-12'
categories:
  - 'how-to'
  - 'hubspot'
  - 'wordpress'
heroImage: '/images/hubspot-to-wordpress.png'
author: 'Stefen Phelps'
layout: '../../layouts/BlogPost.astro'
---

**\*HubSpot supports a blog export tool making this blog post obsolete 💨**

HubSpot makes it extremely difficult to export your blog posts in a usable form. It's built-in export tool only exports the page title and URLs. The website export tool exports all the static HTML files. Neither of these are useful when you need to import your data into a WordPress Database. Here's the solution I came up with that's fairly simple and will hopefully save some people a lot of time.

## Create a Coded Blog Template

In your design manager, create a new coded blog template. Then replace all of the code with this:

```twig
{% if is_listing_view %}"post_name","post_date","post_title","post_content","featured_image","post_author","post_tags",{% for content in contents %}
"{{ content.absolute_url|forceescape|replace('
','') }}","{{ content.publish_date_localized }}","{{ content.name|forceescape|replace('
','') }}","{{ content.post_body|replace('
','')|replace('"','""')|forceescape }}","{{ content.featured_image|forceescape|replace('
','') }}","{{ content.author_name|forceescape|replace('
','') }}","{{ content.topic_list|forceescape|replace('
','') }}"{% endfor %}{% endif %}
```

This will output your blog posts into a CSV syntax and escape the content to prevent any errors with commas and quotation marks inside of each cell. Modify as needed for any custom modules in your template.

## Save the Web Page as a CSV

Change your blog listing to display 1000 posts (that's the max) and then preview the template you just created. Save this webpage as a CSV and remove any HTML snippets from the beginning/end of this file.

Now you can import this into WordPress using any of the CSV Import plugins available out there. Feel free to comment with any questions or tips for getting HubSpot Blogs imported to WordPress.
