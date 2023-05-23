import { Meta } from '@storybook/vue3';
import Block, { CardFollowProps } from './card-follow.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Follow',
	component: Block,
	args: {
		dark: false,
		saved: false,
		liked: true,
		read: true,
	},
} satisfies Meta<CardFollowProps>;

export const CardFollow = createDefaultStory(Block);
