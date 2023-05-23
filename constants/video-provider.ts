export const videoProviders = ['youtube', 'vimeo'] as const;
export type VideoProvider = (typeof videoProviders)[number];

export function videoProviderValidator(provider: unknown) {
	return videoProviders.includes(provider as VideoProvider);
}

export const videoProviderArgType = {
	control: 'select',
	options: videoProviders,
};
