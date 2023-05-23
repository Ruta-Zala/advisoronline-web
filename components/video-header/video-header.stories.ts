import { Meta, StoryObj } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Component, {
	VideoHeaderProps as ComponentProps,
} from './video-header.component.vue';

export default {
	title: 'Components / Video Header',
	component: Component,
	parameters: { layout: 'none' },
} satisfies Meta<ComponentProps>;

export const VideoHeader: StoryObj<ComponentProps> = {
	args: {
		url: 'https://www.youtube.com/embed/CS8wbTr1n-c',
		title: 'Everyone wants sustainability. Not all of them are sustainable',
		date: '05/05/2022',
		tag: 'UP & DOWN',
		thumbnail: faker.image.abstract(),
	},
};
