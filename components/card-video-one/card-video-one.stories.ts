import { Meta, StoryObj } from '@storybook/vue3';
import Component, {
	CardVideoOneProps as ComponentProps,
} from './card-video-one.component.vue';

export default {
	title: 'Components / Card Video One',
	component: Component,
	parameters: { layout: 'none' },
} satisfies Meta<ComponentProps>;

export const CardVideoOne: StoryObj<ComponentProps> = {
	args: {
		url: 'https://www.youtube.com/embed/CS8wbTr1n-c',
		videoDuration: '20 min',
		title: '“Mettiamo al lavoro” i soldi dei clienti',
		description: `Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori`,
	},
};
