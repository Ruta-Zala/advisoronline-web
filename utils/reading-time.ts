const wpm = 225;

export function readingTime(text: string) {
	const words = text.trim().split(/\s+/).length;
	return Math.ceil(words / wpm);
}
