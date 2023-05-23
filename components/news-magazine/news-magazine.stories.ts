import { Meta } from '@storybook/vue3';
import Block from './news-magazine.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / NewsMagazine',
	component: Block,
	args: {
		detailsLink: '#',
		demosLink: '#',
		image: `https://picsum.photos/521/498`,
	},
} satisfies Meta;

export const NewsMagazine = createDefaultStory(Block);
