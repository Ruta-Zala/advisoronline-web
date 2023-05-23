import { faker } from '@faker-js/faker';

export function getFakeImage(width = 1920, height = 1080) {
	const color = faker.color.human();
	// Do not HTML format, in Safari won't work
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${color}"/></svg>`;
	return `data:image/svg+xml,${svg}`;
}
