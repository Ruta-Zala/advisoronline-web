import { Meta, StoryObj } from '@storybook/vue3';
import Block, { CardVideoTwoProps } from './card-video-two.component.vue';
import { themeVariantArgType } from '~/constants/theme-variant';
import { decoratorColumns } from '~/utils/storybook';

export default {
	title: 'Components / Card Video Two',
	component: Block,
	parameters: { layout: 'none' },
	argTypes: { variant: themeVariantArgType },
	decorators: [decoratorColumns(4)],
} satisfies Meta<CardVideoTwoProps>;

export const CardVideoTwo: StoryObj<CardVideoTwoProps> = {
	args: {
		url: 'https://www.youtube.com/embed/CS8wbTr1n-c',
		category: 'Deep Green',
		videoDuration: '20 min',
		title:
			'Skills in data management, technology and advanced mathematics” but also the ability to interact',
		footerText: 'Marcella Persola',
		variant: 'dark',
	},
};
