import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardMagazineProps } from './card-magazine.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Magazine',
	component: Block,
	argTypes: { size: { control: 'select', options: ['medium', 'big'] } },
	args: {
		size: 'medium' as const,
		name: 'Magazine N.22 - Erik Stattin',
		image: faker.image.abstract(),
		magazineUrl: '#',
		showSubscribe: true,
	},
} satisfies Meta<CardMagazineProps>;

export const CardMagazine = createDefaultStory(Block);
