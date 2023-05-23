import { CategoryEntity } from '../types/graphql';
import { convertSlugToString } from './convert-slug-to-string';
import { DeepPartialMaybe } from './types';

export function getCategoryInfo(entity?: DeepPartialMaybe<CategoryEntity>) {
	return {
		name: convertSlugToString(entity?.attributes?.name ?? 'Uncategorized'),
		slug: entity?.attributes?.slug ?? 'uncategorized',
	};
}
