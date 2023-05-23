import { User } from '~/utils/types';
import { useStatefulCookie } from './use-stateful-cookie';

export function useUserInfo() {
	return useStatefulCookie<User | null>('userInfo', {
		default: () => null,
		encode: (value) => {
			const isObject = value !== null && typeof value === 'object';
			let val: User | null = null;

			// Filter null values
			if (isObject) {
				const entries = Object.entries(value).filter(([, v]) => v !== null);
				val = Object.fromEntries(entries) as User;

				// TODO: This will be removed when BE fixed.
				val.newsletterEnabled ??= false;
			}

			// https://github.com/nuxt/nuxt/blob/99ac1d5976d716823dfa8d3f9badb70826bbfa8d/packages/nuxt/src/app/composables/cookie.ts#L27
			return encodeURIComponent(JSON.stringify(val));
		},
	});
}
