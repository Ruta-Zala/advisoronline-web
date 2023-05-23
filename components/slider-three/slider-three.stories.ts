import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { faker } from '@faker-js/faker';
import CardTwo from '../card-two/card-two.component.vue';
import Block, { SliderThreeProps } from './slider-three.component.vue';
import { IconsControl } from '~/utils/storybook';
import { IconZap } from '~/icons';

const list = Array.from({ length: 5 }, () => ({
	title: `Consultinvest, in 2021 profits and masses in decisive growth`,
	image: faker.image.abstract(),
	imageSize: 'small',
	category: 'Asset Manager',
	url: '#',
}));

export default {
	title: 'Components / Slider Three',
	component: Block,
	argTypes: {
		icon: IconsControl(),
	},
	args: {
		title: 'Important News',
		icon: IconZap,
		list,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 1.4,
			},
			768: {
				slidesPerView: 2.4,
			},
			992: {
				slidesPerView: 2.8,
			},
			1200: {
				slidesPerView: 3.2,
			},
			1366: {
				slidesPerView: 4.2,
			},
		},
	},
} satisfies Meta<SliderThreeProps>;

const html = String.raw;

export const SliderThree: StoryFn = (args) => {
	return defineComponent({
		components: { Block, CardTwo },
		setup: () => ({ args }),
		template: html`
			<Block v-bind="args" #default="slide">
				<CardTwo v-bind="slide" />
			</Block>
		`,
	});
};
