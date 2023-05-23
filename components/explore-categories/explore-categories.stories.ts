import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, {
	ExploreCategoriesProps,
} from './explore-categories.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Sections / Explore Categories',
	component: Block,
	args: {
		categories: [
			{
				image: faker.image.abstract(),
				name: 'Outlook',
				url: '#',
			},
			{
				image: faker.image.abstract(),
				name: 'People',
				url: '#',
			},
			{
				image: faker.image.abstract(),
				name: 'Data',
				url: '#',
			},
			{
				image: faker.image.abstract(),
				name: 'Opinions',
				url: '#',
			},
			{
				image: faker.image.abstract(),
				name: 'Interviews',
				url: '#',
			},
			{
				image: faker.image.abstract(),
				name: 'Survey',
				url: '#',
			},
			{
				image: faker.image.abstract(),
				name: 'Sustainability',
				url: '#',
			},
			{
				image: faker.image.abstract(),
				name: 'Regulations',
				url: '#',
			},
		],
	},
} satisfies Meta<ExploreCategoriesProps>;

export const ExploreCategories = createDefaultStory(Block);
