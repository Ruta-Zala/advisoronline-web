import { type Ref } from 'vue';

/**
 * Helps guard over refs that possible have null or undefined values
 *
 * ```ts
 * let someRef: Ref<object | undefined>
 * if (!hasRefValue(someRef)) throw createError ...
 * someRef.value // Type is object only
 * ```
 */
export function hasRefValue<T>(ref: Ref<T>): ref is Ref<NonNullable<T>> {
	return ref.value !== null && ref.value !== undefined;
}
