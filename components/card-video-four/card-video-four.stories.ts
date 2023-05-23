import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { faker } from '@faker-js/faker';
import Block, { CardVideoFourProps } from './card-video-four.component.vue';

export default {
	title: 'Components / Card Video Four',
	component: Block,
	args: {
		thumbnail: faker.image.abstract(),
		url: '#',
		title: 'Glasgow: time to take stock of the negotiations',
		category: 'Asset Manager',
	},
} satisfies Meta<CardVideoFourProps>;

const html = String.raw;

export const CardVideoFour: StoryFn = (args) => {
	return defineComponent({
		components: { Block },
		setup: () => ({ args }),
		template: html`
			<div class="bg-dark-100">
				<Block v-bind="args" />
			</div>
		`,
	});
};
