import { ContentEntity } from '../types/graphql';
import { getCategoryInfo } from './category';
import { DeepPartialMaybe } from './types';

export function getAuthor(entity?: DeepPartialMaybe<ContentEntity>) {
	return entity?.attributes?.custom_author || 'No Author';
}

export function getContentUrl(entity?: DeepPartialMaybe<ContentEntity>) {
	const category = getCategoryInfo(entity?.attributes?.category?.data);
	const slug = entity?.attributes?.slug;
	return slug ? `/${category.slug}/${slug}` : '/not-found';
}
