export function useAcceptLanguage() {
	if (process.client) return [...navigator.languages];
	const headers = useRequestHeaders();
	return parseAcceptLanguage(headers['accept-language']);
}
