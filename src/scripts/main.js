import { registerSW } from 'virtual:pwa-register';
import Snackbar from 'node-snackbar';

// pwa stuff
const updateSW = registerSW({
	onNeedRefresh() {
		Snackbar.show({
			text: 'Update available.',
			actionText: 'Update',
			actionTextColor: '#fff',
			onActionClick: function () {
				updateSW();
			}
		});
	},
	onOfflineReady() {
		Snackbar.show({
			actionTextColor: '#fff',
			text: 'Offline ready.'
		});
	}
});

// toggle light or dark mode
const html = document.documentElement;
const toggleButton = document.querySelector('.footer-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const setColorScheme = (value) => {
	html.dataset.colorScheme = value;
	localStorage.setItem('color-scheme', value);
};

if (localStorage.getItem('color-scheme')) {
	setColorScheme(localStorage.getItem('color-scheme'));
}

toggleButton.addEventListener('click', () => {
	if (!html.dataset.colorScheme && prefersDark.matches) {
		setColorScheme('light');
		return;
	}
	const scheme = html.dataset.colorScheme === 'dark' ? 'light' : 'dark';
	setColorScheme(scheme);
});

// active menu link
const mainNav = document.querySelector('.header-nav-menu');
const setActiveMenuItem = (_) => {
	const menuItems = [...mainNav.querySelectorAll('a')];
	menuItems.forEach((menuItem) => {
		if (window.location.pathname.includes(menuItem.pathname) && menuItem.pathname != '/') {
			menuItem.classList.add('active');
			menuItem.setAttribute('aria-current', 'page');
		} else {
			menuItem.classList.remove('active');
			menuItem.setAttribute('aria-current', '');
		}
	});
};
setActiveMenuItem();

// home page script
var button = document.querySelector('.mustache-button');
var mustacheImg = document.querySelector('.home-image-stache');
button?.addEventListener('click', function () {
	var randomStache = Math.floor(Math.random() * 60 + 1).toString();
	mustacheImg.src = '/images/mustaches/' + randomStache + '.svg';
	mustacheImg.style.display = 'block';
});

// about page script
const progresssBars = document.querySelectorAll('progress');
const radioButtons = document.getElementsByName('type-of-about');
const professionalContent = document.querySelector('.professional-content');
const personalContent = document.querySelector('.personal-content');

function animate() {
	progresssBars?.forEach(function (item) {
		const theFinalNumber = item.value;
		item.classList.remove('ready');
		item.setAttribute('value', 0);
		item.classList.add('ready');
		setTimeout(function () {
			item.setAttribute('value', theFinalNumber);
		}, 100);
	});
}
animate();

radioButtons?.forEach(function (item) {
	item.addEventListener('click', function () {
		if (this.value == 'professional') {
			professionalContent.classList.add('active');
			personalContent.classList.remove('active');
			animate();
		} else {
			professionalContent.classList.remove('active');
			personalContent.classList.add('active');
			animate();
		}
	});
});
