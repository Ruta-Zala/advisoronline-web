import { capitalize } from './capitalize';

export function convertSlugToString(slug: string = '') {
	if (slug.includes(' ')) return slug;

	if (slug.includes('-')) {
		return slugify(slug, '-');
	}

	if (slug.includes('+')) {
		return slugify(slug, '+');
	}

	if (slug.includes('.')) {
		return slugify(slug, '.');
	}

	return slug;
}

function slugify(slug: string, separator: string) {
	return slug
		.split(separator)
		.map((word) => (word.length === 1 ? word : capitalize(word)))
		.join(' ');
}
