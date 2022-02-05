import { registerSW } from 'virtual:pwa-register';
import Snackbar from 'node-snackbar';

const updateSW = registerSW({
	onNeedRefresh() {
		Snackbar.show({
			text: 'Update available.',
			actionText: 'Update',
			actionTextColor: '#eda500',
			onActionClick: function () {
				updateSW();
			},
		});
	},
	onOfflineReady() {
		Snackbar.show({
			actionTextColor: '#eda500',
			text: 'Offline ready.',
		});
	},
});
