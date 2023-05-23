export function chunk<T>(arr: T[], size: number): T[][] {
	return arr.reduce((acc, e, i) => {
		if (i % size) {
			(acc[acc.length - 1] as T[]).push(e);
		} else {
			acc.push([e]);
		}

		return acc;
	}, [] as T[][]);
}
