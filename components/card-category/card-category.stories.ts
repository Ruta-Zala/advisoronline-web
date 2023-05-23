import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardCategoryProps } from './card-category.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Category',
	component: Block,
	args: {
		name: 'Careers',
		image: faker.image.abstract(),
		url: '#',
	},
} satisfies Meta<CardCategoryProps>;

export const CardCategory = createDefaultStory(Block);
