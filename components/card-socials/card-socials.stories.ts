import { Meta } from '@storybook/vue3';
import Block, { CardSocialsProps } from './card-socials.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Socials',
	component: Block,
	args: {
		dark: false,
	},
} satisfies Meta<CardSocialsProps>;

export const CardSocials = createDefaultStory(Block);
