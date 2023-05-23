export function parseNumber(value: unknown, defaultValue: number): number {
	const val = Number(value);
	return Number.isNaN(val) ? defaultValue : val;
}
