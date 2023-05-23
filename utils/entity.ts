import { RequiredNonNullable } from './types';

export function isValidEntity<T>(entity: T): entity is RequiredNonNullable<T> {
	const e = entity as any;
	return e?.id != null && e?.attributes != null;
}
