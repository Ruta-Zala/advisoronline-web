import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardOneProps } from './card-one.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card One',
	component: Block,
	args: {
		title: `Consultinvest, in 2021 profits and masses in decisive growth`,
		description: `Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più`,
		image: faker.image.abstract(),
		category: 'Asset Manager',
		writer: 'Advisor Writing',
		event: {
			date: '24 April',
			location: 'TBC, Rome',
			startingTime: '09:30',
			endingTime: '13:00',
		},
		url: '#',
	},
} satisfies Meta<CardOneProps>;

export const CardOne = createDefaultStory(Block);
