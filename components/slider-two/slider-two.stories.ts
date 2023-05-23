import { Meta } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { SliderTwoProps } from './slider-two.component.vue';
import { createDefaultStory } from '~/utils/storybook';
import blackRockLogo from '~/assets/partners-logos/pro-blackrock.svg';

export default {
	title: 'Components / Slider Two',
	component: Block,
	args: {
		title: 'Focus Sostenibilità',
		logo: blackRockLogo,
		list: Array.from({ length: 5 }, () => ({
			image: faker.image.abstract(),
			title: 'Consultinvest, in 2021 profits and masses in decisive growth',
			imageSize: 'small',
			category: 'Asset Manager',
			url: '#',
		})),
		viewMoreUrl: '#',
	},
} satisfies Meta<SliderTwoProps>;

export const SliderTwo = createDefaultStory(Block);
