import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardThreeProps } from './card-three.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Card Three',
	component: Block,
	args: {
		image: faker.image.abstract(),
		category: 'Consulenti Finanziari',
		title: `“Mettiamo al lavoro” i soldi dei clienti`,
		description:
			'Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di ',
		date: '04/04/2022',
		url: '#',
	},
} satisfies Meta<CardThreeProps>;

export const CardThree = createDefaultStory(Block);
