import { UploadFileEntity } from '~/types/graphql';
import { getFakeImage } from './get-fake-image';
import { DeepPartialMaybe } from './types';

export function getImageUrl(
	entity?: DeepPartialMaybe<UploadFileEntity>,
	width?: number,
	height?: number,
) {
	return entity?.attributes?.url ?? getFakeImage(width, height);
}
