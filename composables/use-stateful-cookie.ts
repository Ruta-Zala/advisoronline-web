import { WatchCallback, watch } from 'vue';
import { CookieOptions, CookieRef } from '#app';
import { useCookie, useState } from '#imports';

/**
 * TODO: Remove when is fixed
 * https://github.com/nuxt/nuxt/issues/13020#issuecomment-1397282717
 */
export function useStatefulCookie<T = string | null>(
	name: string,
	options?: CookieOptions<T>,
): CookieRef<T> {
	const cookie = useCookie(name, options);
	const state = useState(name, () => cookie.value);

	const callback: WatchCallback<T, T> = () => {
		cookie.value = state.value;
	};

	watch(state, callback, { deep: true });

	return state;
}
