---
title: 'Keyboard Accessible Dropdown Menu'
description: "Thanks to the new CSS psuedo class ':focus-within', keyboard accessible dropdown menus are much simpler to create than they used to be."
heroImage: '/images/keyboard-accessible-dropdown-menu.png'
publishDate: '2023-05-24'
author: 'Stefen Phelps'
layout: '../../layouts/BlogPost.astro'
---

When browsing the web via a keyboard, tabbing through page links is the primary way to navigate around a page quickly. This creates a problem with traditional dropdown nav menus. You either go the Bootstrap route and force a click to display the dropdown, or use a CSS Hover state and some javascript hackery to make it keyboard accessible. Either way you need to use javascript to make it fully accessible.

Thanks to a new CSS psuedo class, we can remove this additional javascript and simplify the entire thing thanks to `:focus-within`. If you've been coding HTML nav menus for a while now, you'll know the basic technique already is to use semantic markup like so:

```html
<nav>
	<ul>
		<li>
			<a href="/page">Page link</a>
			<ul>
				<li><a href="/page/subpage">I'm a dropdown item</a></li>
			</ul>
		</li>
		<li>
			<a href="/page">Another link</a>
		</li>
	</ul>
</nav>
```

And then use some basic styles to make it look like a menu and show the dropdown on hover like so:

```css
nav ul {
	display: flex;
	gap: 1rem;
	list-style: none;
	margin: 0;
	padding: 0;
}
nav ul li {
	position: relative;
}
nav ul li ul {
	position: absolute;
	top: 100%;
	left: 0;
	visibility: hidden;
}
nav ul li:hover ul {
	visibility: visible;
}
```

This is where you can skip the entire javascript portion of this process and now add just a single extra line to your hover styles:

```css
nav ul li:hover ul,
nav ul li:focus-within ul { {
	visibility: visible;
}
```

It's so nice when new standards come out that simplify things that used to be a lot more complex 🥰
