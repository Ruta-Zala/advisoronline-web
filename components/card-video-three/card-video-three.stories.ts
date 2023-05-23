import { Meta, StoryObj } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { CardVideoThreeProps } from './card-video-three.component.vue';

export default {
	title: 'Components / Card Video Three',
	component: Block,
	parameters: { layout: 'none' },
} satisfies Meta<CardVideoThreeProps>;

export const CardVideoThree: StoryObj<CardVideoThreeProps> = {
	args: {
		url: 'https://www.youtube.com/embed/CS8wbTr1n-c',
		provider: 'youtube',
		title: 'Everyone wants sustainability. Not all of them are sustainable',
		thumbnail: faker.image.abstract(),
		subtitle: 'Play the most recent video',
	},
};
