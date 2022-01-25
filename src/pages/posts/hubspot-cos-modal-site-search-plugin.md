---
title: 'HubSpot COS Modal Site Search [plugin]'
description: 'A quick and easy way to provide a nice search experience on your HubSpot website'
publishDate: '2016-12-08'
categories:
  - 'hubspot'
heroImage: '/blog/cos-modal-site-search.gif'
author: 'Stefen Phelps'
layout: '../../layouts/BlogPost.astro'
---

**2019 Update — [HubSpot now offers a site search API](https://developers.hubspot.com/docs/methods/content/search-for-content). I highly recommend using the search API going forward. This guide was written before the API existed but I'll leave it up as a reference.**

## Why I Made It

I created this plugin because it was something I needed myself and something I knew others on the COS were missing. The default HubSpot search module takes users off your website and is not an ideal solution by any means.

[HubSpot's own website](https://www.hubspot.com/) has a really nice modal search that displays it's results in an overlay:

![hubspot modal site search](/blog/HubSpot-Modal-Search.gif)

We like it because it provides a visually pleasing design, a great user experience by not taking you off the page or causing a page refresh, and because it provides real time results as you type your query. That's the kind of experience we wanted and that's what we set out to build!

## How It Works

The plugin uses the website's sitemap.xml file to get an index of all the website's public pages, formats the URL into a title, and then filters those results with [List.js](http://listjs.com/) as you type.

Feel free to dig into the finer details on the [GitHub repo](https://github.com/growwithsms/HubSpot-COS-Site-Search) and fix any bugs you find while you're in there! ?

## Limitations

Because the sitemap.xml only provides the URL and the date the page was modified, it is limited to only display titles based on the URL which may lead to funky worded titles. In addition, if your website is larger than a few hundred pages, you'll most likely start running into performance issues if using as is.

[Visit the github repo](https://github.com/growwithsms/HubSpot-COS-Site-Search) for instructions on how to use it on your website.
