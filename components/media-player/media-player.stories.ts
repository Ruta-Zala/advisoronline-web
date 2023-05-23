import { Meta, StoryObj } from '@storybook/vue3';
import { videoProviderArgType } from '~/constants/video-provider';
import MediaPlayer, { MediaPlayerProps } from './media-player.component.vue';

export default {
	title: 'Components / Media Player',
	component: MediaPlayer,
	argTypes: {
		provider: videoProviderArgType,
	},
} satisfies Meta<MediaPlayerProps>;

export const YouTubeSource: StoryObj<MediaPlayerProps> = {
	name: 'YouTube Source',
	args: {
		provider: 'youtube',
		id: 'bTqVqk7FSmY',
	},
};

export const VimeoSource: StoryObj<MediaPlayerProps> = {
	args: {
		provider: 'vimeo',
		id: 'https://vimeo.com/40648169',
	},
};
