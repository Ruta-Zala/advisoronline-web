import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { PersonInfoProps } from './person-info.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Person Info',
	component: Block,
	args: {
		name: 'Gabriele Alberici',
		role: 'Head of Sales Italy',
		phone: '+39 348 283 19 73',
		email: 'gabriele.alberici@general-invest.com',
		profilePic: faker.image.abstract(),
	},
} satisfies Meta<PersonInfoProps>;

export const PersonInfo = createDefaultStory(Block);
