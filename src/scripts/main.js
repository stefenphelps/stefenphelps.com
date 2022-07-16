import { registerSW } from 'virtual:pwa-register';
import Snackbar from 'node-snackbar';

const updateSW = registerSW({
	onNeedRefresh() {
		Snackbar.show({
			text: 'Update available.',
			actionText: 'Update',
			actionTextColor: 'var(--accent)',
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

const mainNav = document.querySelector('.header-nav-menu');
const setActiveMenuItem = (_) => {
	const menuItems = [...mainNav.querySelectorAll('a')];
	menuItems.forEach((menuItem) => {
		if (
			window.location.pathname.includes(menuItem.pathname) &&
			menuItem.pathname != '/'
		) {
			menuItem.classList.add('active');
			menuItem.setAttribute('aria-current', 'page');
		}
	});
};
setActiveMenuItem();
