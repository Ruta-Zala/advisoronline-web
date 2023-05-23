import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { faker } from '@faker-js/faker';
import Block, { SectionThreeProps } from './section-three.component.vue';
import CardVideoSeries from '~/components/card-video-series/card-video-series.component.vue';

export default {
	title: 'Sections / Section Three',
	component: Block,
	args: {
		category: 'UP & DOWN',
		image: faker.image.abstract(),
		video: {
			title: 'Effetto "rock" sul Salone del Risparmio',
			url: 'https://www.youtube.com/embed/CS8wbTr1n-c',
			date: '05/05/2022',
		},
		slider: {
			title: 'Advisor videos',
			list: Array.from({ length: 5 }, () => ({
				id: faker.datatype.uuid(),
				url: '#',
				videoNumber: 13,
				category: 'Interviews',
				duration: '10 - 20min',
				title: 'The “traditional” interview style focused on financial world',
				image: faker.image.abstract(),
			})),
		},
		link: {
			text: 'EXPLORE ALL FINANCIAL VIDEOS',
			url: '#',
		},
	},
} satisfies Meta<SectionThreeProps>;

const html = String.raw;

export const SectionThree: StoryFn = (args) => {
	return defineComponent({
		components: { Block, CardVideoSeries },
		setup: () => ({ args }),
		template: html`
			<Block v-bind="args" #default="slide">
				<CardVideoSeries v-bind="slide" />
			</Block>
		`,
	});
};
