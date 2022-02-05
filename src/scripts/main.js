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
