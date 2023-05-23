import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardEventProps } from './card-event.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Event',
	component: Block,
	args: {
		date: '24 April',
		location: 'TBC, Rome',
		startingTime: '09:30',
		endingTime: '13:00',
		title: 'Lo spazio inesplorato',
		description:
			'What are the megatrends destined to grow exponentially in the near future?',
		writer: 'Advisor Writing',
		isSaved: false,
		image: faker.image.abstract(),
		showFrame: true,
		url: '#',
	},
} satisfies Meta<CardEventProps>;

export const CardEvent = createDefaultStory(Block);
