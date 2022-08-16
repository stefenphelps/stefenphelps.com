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
			actionTextColor: 'var(--accent)',
			text: 'Offline ready.'
		});
	}
});

// active menu link
// todo: handle this server side
const mainNav = document.querySelector('.header-nav-menu');
const setActiveMenuItem = (_) => {
	const menuItems = [...mainNav.querySelectorAll('a')];
	menuItems.forEach((menuItem) => {
		if (window.location.pathname.includes(menuItem.pathname) && menuItem.pathname != '/') {
			menuItem.classList.add('active');
			menuItem.setAttribute('aria-current', 'page');
		}
	});
};
setActiveMenuItem();

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
