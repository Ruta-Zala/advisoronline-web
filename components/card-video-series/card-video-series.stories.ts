import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardVideoSeriesProps } from './card-video-series.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Video Series',
	component: Block,
	args: {
		url: '#',
		videoNumber: 13,
		category: 'Interviews',
		duration: '10 - 20min',
		title: 'The “traditional” interview style focused on financial world',
		image: faker.image.abstract(),
	},
} satisfies Meta<CardVideoSeriesProps>;

export const CardVideoSeries = createDefaultStory(Block);
