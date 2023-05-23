import { setup } from '@storybook/vue3';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';
import '../styles.css';

setup((app) => {
	app.use(
		createI18n({
			legacy: false,
			locale: 'en',
			fallbackLocale: 'en',
			messages,
		}),
	);
});

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
