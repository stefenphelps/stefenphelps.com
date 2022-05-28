---
title: 'How To Make an Awesome About Us Page | Part 2: The Code'
description: "In part 2 (this post!), I'll be discussing the technical aspects of making the team member photos/videos come alive on the web, some issues we faced and how we solved them"
publishDate: '2016-10-18'
categories:
  - 'how-to'
heroImage: '/blog/behind-the-team-member-photos.webp'
author: 'Stefen Phelps'
layout: '../../layouts/BlogPost.astro'
---

Lief discussed the planning and production stages of our about page overhaul in part 1. In part 2 (this post!), I'll be discussing the technical aspects of making the team member photos/videos come alive on the web, some issues we faced and how we solved them. If you haven't seen it yet, be sure to **[check out our awesome about page](https://www.growwithsms.com/about) before you do anything else!**

## How We Created Our Team Member "Moving Photos"

The key to creating photos that come to life — the Harry Potter effect if you will — was to use native HTML5 video elements, hiding the video controls and using the first frame of the video as the video thumbnail (aka the "poster"). For example, the basic HTML for Matt's video looks like this:

```html
<video id="video" poster="/videos/Matt-Johnson.webp">
	<source src="/videos/Matt.mp4" type="video/mp4" />
</video>
```

NOTE: the controls attribute is completely omitted from the video element purposefully so the controls are hidden from the end-user.

At this point we have what is essentially just a still photo. Now we need an *event* to trigger the video to play. We'll use javascript to manipulate the [HTMLMediaElement API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) to play the video on hover. We chose to use the *on hover event* so users could unknowingly trigger it as they browse the page*.* Th*e* javascript looks like this:

```javascript
var teamMember = $('#video').hover(hoverVideo);
function hoverVideo(e) {
	e.preventDefault();
	$(this).get(0).play();
}
```

The default behavior after a web video ends is to pause on the last frame. This resulted in a funky looking Team Photos page after the videos were all played. So we needed to adjust our script to show the poster/thumbnail image once the video ended. Thankfully, the HTMLMediaElement API has a "currentTime" property and an "ended" property so we were able to change the play position back to the beginning after the video has finished loading (this worked for us because our thumbnail image was actually just the first frame). Now the script looks like this:

```javascript
var teamMember = $('#video').hover(hoverVideo);
function hoverVideo(e) {
	e.preventDefault();
	$(this).get(0).play();
	$(this).on('ended', function () {
		this.currentTime = 0;
		this.pause();
	});
}
```

NOTE: Internet Explorer played the video on repeat so we added the pause event to fix this bug.

## Optimizing for Performance

At this point we had achieved the effect we were shooting for and were extremely happy with the way it looked and functioned. Now, we needed to figure out how to have 15 of these "moving photos" on the page without affecting page performance or causing an extremely large amount of data to be downloaded — a big concern for mobile visitors.

To save mobile users from downloading large amounts of data we disabled the video's preload functionality. In addition, we converted the videos from h.264 encoded MP4 files to the latest VP9 encoded WebM video file standard. This one change made our average file size go from 4MB per video to just under 1MB, a 75% data savings!

The WebM file format also comes with the added benefit of having a low computational footprint. In other words, playing 15 videos simultaneously no longer slowed the page down to a crawl on low powered desktops/laptops.
