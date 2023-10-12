---
title: 'Keyboard Accessible Dropdown Menu'
description: "Thanks to the new CSS psuedo class ':focus-within', keyboard accessible dropdown menus are much simpler to create than they used to be."
heroImage: '../../assets/images/keyboard-accessible-dropdown-menu.png'
publishDate: '2023-05-24'
author: 'Stefen Phelps'
---

When browsing the web via a keyboard, tabbing through page links is the primary way to navigate around a page quickly. However, this creates a problem with traditional dropdown navigation menus. When tabbing through, you can't access the dropdown items since they typically require a mouse hover.

To address this issue, you have a couple of options. One approach is to go the [Bootstrap](https://getbootstrap.com/docs/4.0/components/dropdowns/#single-button-dropdowns) route and require a click to display the dropdown (equivalent to pressing the return key on a keyboard). Alternatively, you can utilize a combination of CSS Hover state for mouse users and employ some [JavaScript hackery](https://blog.hubspot.com/website/accessible-drop-down-menus) to make the dropdown display itself when the parent item receives focus state, mimicking a mouseover interaction. Both approaches necessitate additional client-side JavaScript to ensure full accessibility.

However, thanks to a new CSS pseudo-class, we can eliminate the need for this extra JavaScript and simplify the entire process using `:focus-within`.

## The Markup

If you've been coding HTML navigation menus for a while now, you'll know the basic technique already. Your markup should look something like this:

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

## The Styles

And then use some basic styles to make it look like a menu and show the dropdown on hover like this:

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

## The New Good Good

This is where you can skip the entire JavaScript portion of this process and add just a single extra line to your hover styles:

```css
nav ul li:hover ul,
nav ul li:focus-within ul {
	visibility: visible;
}
```

Typically this is when you learn that there isn't enough browser support for this new sparkly web thing you just learned about and can't use it — But wait! It's actually quite good and [all modern browsers have supported](https://caniuse.com/css-focus-within) it for at least a couple years now. 🕺

It's nice when new standards come out that simplify things that used to be a lot more complex and all the browsers hop on board. 🥰
