import { useRuntimeConfig } from '#app';

export function useApiUrl() {
	const config = useRuntimeConfig();
	return (route: string) => `${config.public.restApi}/${route}`;
}
