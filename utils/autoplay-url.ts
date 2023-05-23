export function autoPlayURL(url: string) {
	const _url = new URL(url);
	_url.searchParams.set('autoplay', '1');
	return _url.href;
}
