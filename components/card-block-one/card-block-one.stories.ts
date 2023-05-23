import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardBlockOneProps } from './card-block-one.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Block One',
	component: Block,
	argTypes: { size: { control: 'select', options: ['small', 'medium'] } },
	args: {
		size: 'medium',
		image: faker.image.abstract(),
		category: 'Asset Manager',
		title: 'Asset manager, the resilience of traditional players',
		date: '05/05/2022',
		url: '#',
	},
} satisfies Meta<CardBlockOneProps>;

export const CardBlockOne = createDefaultStory(Block);
