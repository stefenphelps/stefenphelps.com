---
title: "Simple Video Modal with No Dependencies"
description: "Code a video modal using native HTML elements, HTML APIs, and a touch of javascript."
publishDate: "2022-07-16"
heroImage: "../../assets/images/video-modal.png"
author: "Stefen Phelps"
---

There are no shortages of great [video](https://getbootstrap.com/docs/4.0/components/modal/) [modal](https://micromodal.vercel.app) [plugins](https://appleple.github.io/modal-video/) [out there](https://dimsemenov.com/plugins/magnific-popup/) [these days](https://sorgalla.com/lity/). But, how about we try something other than searching NPM and adding yet another dependency to your web project. Instead, we are going to take advantage of the amazing built-in APIs that browsers already give us.

## The Native Way to Make a Video Modal

We are going to use a `<dialog>` element for the modal, a `<button>` element to trigger the modal, and a `<video>` element for the video. Although, you could easily swap out the `<video>` element for a YouTube or Vimeo embed if you prefer. Here's what the markup looks like:

```html
<button class="open-modal">Play Video</button>

<dialog class="video-modal">
  <form method="dialog">
    <button class="video-modal-close">Close</button>
  </form>
  <video controls width="720">
    <source src="example.webm" type="video/webm" />
    <source src="example.mp4" type="video/mp4" />
  </video>
</dialog>
```

Now, we need some javascript to trigger the modal on click of the button, play the video automatically so we don't require a second click from the user, and finally pause the video when the modal is closed.

```javascript
const openModalButton = document.querySelector(".open-modal");
const modal = document.querySelector(".video-modal");
const video = document.querySelector(".video-modal video");

openModalButton.addEventListener("click", function onOpen() {
  // .showModal() is part of the HTMLDialogElement API
  modal.showModal();
  // .play() is part of the HTMLMediaElement API
  video.play();
});

modal.addEventListener("close", function onClose() {
  // "Close" button inside the form triggers "close" on dialog because of [method="dialog"]
  // .pause() is part of the HTMLMediaElement API
  video.pause();
});
```

Thanks to the [HTMLDialogElement API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement) and [HTMLMediaElement API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement), we don't have to write hardly any code to create a fully accessible and performant video modal.

## Live Demo

<p class="codepen" data-height="700" data-default-tab="result" data-slug-hash="LYdxWay" data-user="stefen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
	<span>See the Pen <a href="https://codepen.io/stefen/pen/LYdxWay">
	Simple Video Modal with no dependencies</a> by Stefen (<a href="https://codepen.io/stefen">@stefen</a>)
	on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

You'll want to sprinkle some CSS in there to make it look nice, but it's pretty cool how far we can get without the use of any NPM packages if we choose to do so.
