import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { faker } from '@faker-js/faker';
import Block, { SectionTwoProps } from './section-two.component.vue';
import CardEvent from '~/components/card-event/card-event.component.vue';

const list = Array.from({ length: 5 }, () => ({
	id: faker.datatype.uuid(),
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
	showFrame: false,
	url: '#',
}));

export default {
	title: 'Sections / Section Two',
	component: Block,
	args: {
		title: 'Upcoming Events',
		list,
		link: {
			title: 'EXPLORE EVENTS',
			url: '#',
		},
	},
} satisfies Meta<SectionTwoProps>;

const html = String.raw;

export const SectionTwo: StoryFn = (args) => {
	return defineComponent({
		components: { Block, CardEvent },
		setup: () => ({ args }),
		template: html`
			<Block v-bind="args" #default="slide">
				<CardEvent v-bind="slide" />
			</Block>
		`,
	});
};
