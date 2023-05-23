import { Meta } from '@storybook/vue3';
import Block, { CardGuidebooksProps } from './card-guidebooks.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Guidebooks',
	component: Block,
	argTypes: { buttonSize: { control: 'select', options: ['small', 'big'] } },
	args: {
		dark: false,
		buttonSize: 'big',
		description: 'Discover all details about fixed income guide',
	},
} satisfies Meta<CardGuidebooksProps>;

export const CardGuidebooks = createDefaultStory(Block);
