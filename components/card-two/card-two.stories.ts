import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardTwoProps } from './card-two.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Two',
	component: Block,
	argTypes: { imageSize: { control: 'select', options: ['small', 'medium'] } },
	args: {
		title: `Consultinvest, in 2021 profits and masses in decisive growth`,
		description: `Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più`,
		image: faker.image.abstract(),
		imageSize: 'medium',
		category: 'Asset Manager',
		author: 'Advisor Writing',
		url: '#',
	},
} satisfies Meta<CardTwoProps>;

export const CardTwo = createDefaultStory(Block);
