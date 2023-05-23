/// <reference types="@total-typescript/ts-reset" />
// TODO: https://github.com/nuxt/nuxt/issues/14131
/// <reference types="vite/client" />

declare namespace NodeJS {
	interface ProcessEnv {
		NUXT_STRAPI_ORIGIN: string;
		NUXT_DEFAULT_LOCALE?: 'en' | 'it';
	}
}

declare module '*.graphql' {
	import { DocumentNode } from 'graphql';
	const Schema: DocumentNode;
	export = Schema;
}
