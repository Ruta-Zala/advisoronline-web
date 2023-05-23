import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { PrivateMagazineProps } from './private-magazine.component.vue';
import { createDefaultStory } from '~/utils/storybook';
import IconBook from '~/components/subscribe-newsletter/components/icon-book-open.component.vue';
import { IconDigital, IconCreditCard } from '~/icons';

export default {
	title: 'Components / Private Magazine',
	component: Block,
	args: {
		title: 'Advisor & Advisor Private magazines',
		description:
			'Receive dedicated news and insigtfull information in the financial world',
		shortDescription: 'Discover all advantages and plans we provide',
		image1: { text: 'Advisor maggio', image: faker.image.abstract(205, 278) },
		image2: {
			text: 'Magazine N.22 - Erik Stattin',
			image: faker.image.abstract(281, 412),
		},
		image3: {
			text: 'AP Advisor Private',
			image: faker.image.abstract(205, 278),
		},
		categories: [
			{ name: 'Digital format', icon: IconDigital },
			{ name: 'Print Format', icon: IconBook },
			{ name: 'Multiple Plans', icon: IconCreditCard },
		],
	},
} satisfies Meta<PrivateMagazineProps>;

export const PrivateMagazine = createDefaultStory(Block);
