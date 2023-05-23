import { FetchError } from 'ofetch';

export function isFetchError<T>(e: unknown): e is FetchError<T> {
	return (e as FetchError)?.name === 'FetchError';
}
