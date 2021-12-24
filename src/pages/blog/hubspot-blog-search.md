---
title: 'How to Build a HubSpot Blog Search'
description: "Have you ever wished your HubSpot blog had a search feature that didn't take you off your website — _looking at you, google search module_ ? — and that it would search only for blog posts? Here is how I recently accomplished this task"
publishDate: '2017-05-16'
categories:
  - 'hubspot'
heroImage: '/blog/search-hubspot-blog.gif'
author: Stefen Phelps
layout: '../../layouts/BlogPost.astro'
---

**2019 Update — [HubSpot now offers a site search API](https://developers.hubspot.com/docs/methods/content/search-for-content). I highly recommend using the search API going forward. This guide was written before the API existed but I'll leave it up as a reference.**

---

Have you ever wished your HubSpot blog had a search feature that didn't take you off your website — *looking at you, google search module* ? — and that it would search only for blog posts? Here is how I recently accomplished this task for [Quad City Safety](https://www.quadcitysafety.com/) and if you follow along, it's really not all that hard to implement yourself.

Before we dive in, let's break down what a HubSpot Blog Search consists of into its simplest form. It comes down to these three basic elements:

1. [The Search Form](#search-form)
2. [The Search Results Page](#search-results-page)
3. [The Blog For Loop](#blog-for-loop)

## 1\. The Search Form

The first step to creating your blog search is to add an HTML module to your blog template and create a form with a single text input and a submit button like so:

```
<form action="/blog/search">
    <input name="query" type="text" placeholder="Search the blog..." />
    <button type="submit">Search</button>
</form>
```

The two important attributes to make note of for later are the form's action and the input's name. The action attribute's value is where you'll be taken when you submit the form. In this case, the value is the URL of the search results page (that we'll create in step 2). The name attribute's value is the parameter that will be added to the URL - which is what we'll target in our Blog loop in step 3 in order to populate the search results.

## 2\. The Search Results Page

Before you can get search results, you need a place to display those search results. Create a new site page (or landing page if you don't have the Website Add-On) using whichever basic template you prefer (we'll be modifying this template in step 3). The important thing is that you create the page with the URL you used in the value of the form's *action* attribute. Using our example above we'll create this page with "/blog/search" as the URL.

Once you've published this page, go ahead and test your search form now. I'll wait.

Don't worry, I'll still be here.

.

I'm serious.

.

.

Done?

.

.

Okay... Sure you are...

.

Did the form take you to the search results page? Did you see the query parameter added to the URL like so "**/blog/search?query=my+search+example**" but you don't see any search results?

![search-results-page](/blog/search-results-page.png)

**Perfect!** Now let's create those search results.

## 3\. The Blog For Loop

To populate the search results page with actual results, we'll need to use HubL (HubSpot's server side programming language) to loop through and display the blog posts that contain our search query.

Go ahead and edit the search results page's template (or clone it if you want to be safe) and add a HubL module where you want the search results to display on the page. In your HubL module we are going to be doing two primary things. First, we're going to use the **_[blog_recent_posts](https://designers.hubspot.com/en/docs/hubl/hubl-supported-functions#blog-recent-posts)_** function to pull in your most recent posts. Then, we'll filter those posts by their titles using the **_request.query_dict_** [HTTP request variable](https://designers.hubspot.com/docs/hubl/hubl-supported-variables#http-request-variables) to get the search query parameter from the URL. Here's the code:

```
{% set recent_posts = blog_recent_posts('default', 200) %}
{% set searchQuery = request.query_dict['query'] %}

{% for recent_post in recent_posts %}
  {% if searchQuery and searchQuery|lower in recent_post.name|lower %}
    <div class="post-title">{{ recent_post.name }}</div>
  {% endif %}
{% endfor %}
```

Now, if you go back to your search input, you should see your matching search results:

![hubspot-blog-search.gif](/blog/hubspot-blog-search.gif)

**Awesome!** You just built yourself your first search engine!

Now that you know the basics behind building a search in HubSpot, the sky's the limit. There are a ton of things you can do in addition to the basic search above such as advanced filtering by topics, search the content of the post in addition to the title, highlight the search term in the search results, or you could even Ajax the results into a modal popup window like my [HubSpot COS Modal Site Search plugin](https://github.com/growwithsms/HubSpot-COS-Site-Search).
