import dompurify from 'isomorphic-dompurify';

export function stripHtml(html: string) {
	const fragment = dompurify.sanitize(html, { RETURN_DOM_FRAGMENT: true });
	return fragment.textContent ?? '';
}
