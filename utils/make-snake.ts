export function makeSnake(text: string) {
	const [head, ...tail] = text.split(' ');
	return { head, tail: tail.join(' ') };
}
