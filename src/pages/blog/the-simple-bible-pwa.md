---
title: 'Building a Bible PWA in 2023'
description: 'How and why I built a Bible app from scratch using modern web technologies'
heroImage: '/images/simple-bible-pwa.png'
publishDate: '2023-05-22'
author: 'Stefen Phelps'
layout: '../../layouts/BlogPost.astro'
---

## Why another Bible app?

I wasn't super impressed by the state of Bible apps: each one bombards users with marketing popups, requires account creation, or are just plain slow. I just wanted a simple Bible app that got out of the way, wasn't annoying to use, and put the focus on the reading experience. So... here we are... I made [yet another Bible app](https://astro-bible.netlify.app) that aims to provide a hassle-free and enjoyable way to engage with the Scriptures.

## How it's made

Using my favorite all-in-one web framework — [Astro](https://astro.build/) — and with the help of [Thiago Bodruk's Bible XML and JSON project](https://github.com/thiagobodruk/bible), I was able to put together a really nice Bible app with support for dark mode, offline support, and even an AI powered pastor for you to get answers to your Bible questions (all the cool kids use AI these days so I've heard).

## Let's dig into the features

A few of my favorite things about the app:

### Fluid typography

<video width="784" autoplay loop muted playsinline src="/videos/fluid-typography.mp4"></video>

Good typography involves a handful of things that all need to play nicely together: size, line height, spacing, and the font itself. Using fluid sizes and line heights and the native operating system's font makes for a great reading experience.

### Native Sharing UI

<video width="784" autoplay loop muted playsinline src="/videos/native-sharing.mp4"></video>

The [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) allows web developers to use the operating system's native UI for sharing individual verses. This means you can easily add a verse to your Notes app for instance, or as a text to your spouse. Since this is a web first app, if they don't have the app installed it will just open up in their browser.

### Offline support

<video width="784" autoplay loop muted playsinline src="/videos/offline-support.mp4"></video>

This is basic but necessary. Too many apps and websites that should include offline support just don't. This one does. And it automatically downloads in the background without any interaction from the user required. Since Astro uses Vite under the hood it was fairly simple to implement the [Vite PWA plugin](https://vite-pwa-org.netlify.app) which handles all the workbox/service worker logic for you.

### AI Pastor

<video width="784" autoplay loop muted playsinline src="/videos/ai-pastor.mp4"></video>

I was hesitant to add this because this is supposed to be a simple Bible app... but I think I was able to implement this without getting in the way of the user and I find it to be a lot more useful than I originally thought it would be. So far I've been really impressed with it's answers. Now if OpenAI can get their API to respond in under 10 seconds that would be even better but who am I to complain.

## The future

I've added the app to the [Google Play Store](https://play.google.com/store/apps/details?id=app.netlify.astro_bible.twa) but have yet to cough up the $100 for the Apple App Store... I also enquired about licensing the ESV translation which would be another ~$250.

I finished everything I set out for it to be and I'll be using it as my daily Bible app for the foreseeable future. So, this project is somewhat on hold for now unless anybody has more translations they can provide me in JSON format 😉
