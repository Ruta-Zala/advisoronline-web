import { z } from 'zod';
import { type NuxtPage } from '@nuxt/schema';
import postCssConfig from './postcss.config';
import en from './i18n/locales/en.json';
import it from './i18n/locales/it.json';

// Validate process.env, will fail if not matching
z.object({
	NUXT_STRAPI_ORIGIN: z.string().url(),
	NUXT_DEFAULT_LOCALE: z.enum(['en', 'it']).optional(),
}).parse(process.env);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~/styles.css'],
	postcss: postCssConfig,

	modules: [
		// https://nuxt.com/modules/google-fonts
		'@nuxtjs/google-fonts',
		// https://nuxt.com/modules/apollo
		'@nuxtjs/apollo',
		// https://nuxt.com/modules/vueuse
		'@vueuse/nuxt',
		//https://nuxt.com/modules/i18n
		'@nuxtjs/i18n',
	],

	googleFonts: {
		families: {
			'Montserrat': [100, 200, 300, 400, 500, 600, 700, 800, 900],
			'Playfair+Display': [400, 500, 600, 700, 800, 900],
		},
	},

	runtimeConfig: {
		public: {
			restApi: `${process.env.NUXT_STRAPI_ORIGIN}/api`,
		},
	},

	apollo: {
		clients: {
			default: {
				httpEndpoint: `${process.env.NUXT_STRAPI_ORIGIN}/graphql`,
			},
		},
	},

	app: {
		head: {
			title: 'Advisor Online',
			link: [{ rel: 'shortcut icon', href: '/favicon.ico?v=1' }],
		},
	},

	hooks: {
		'pages:extend': (pages) => removePagesNotMatching(pages),
	},

	i18n: {
		locales: ['en', 'it'],
		defaultLocale: process.env.NUXT_DEFAULT_LOCALE ?? 'it',
		strategy: 'prefix_except_default',
		vueI18n: {
			legacy: false,
			fallbackLocale: 'en',
			messages: {
				en,
				it,
			},
		},
	},
});

function removePagesNotMatching(pages: NuxtPage[] = []) {
	const pattern = /\.page\.vue$/;
	const pagesToRemove = [];

	for (const page of pages) {
		if (page.file && pattern.test(page.file)) {
			page.name = page.name?.replaceAll(`.page`, '');
			page.name = page.name?.replaceAll(`-index`, '');

			page.path = page.path.replaceAll(`.page`, '');
			page.path = page.path?.replaceAll(`/index`, '');

			if (page.name === 'index') {
				page.path = '/';
			} else {
				page.path = page.path?.replaceAll(`index`, '');
			}

			removePagesNotMatching(page.children);
		} else {
			pagesToRemove.push(page);
		}
	}

	for (const page of pagesToRemove) {
		pages.splice(pages.indexOf(page), 1);
	}
}
