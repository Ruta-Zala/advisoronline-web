import { Meta, StoryObj } from '@storybook/vue3';
import Block, { TagProps } from './tag.component.vue';
import { themeVariantArgType } from '~/constants/theme-variant';

export default {
	title: 'Components / Tag',
	component: Block,
	parameters: { layout: 'none' },
	argTypes: { variant: themeVariantArgType },
} satisfies Meta<TagProps>;

export const Tag: StoryObj<TagProps> = {
	args: {
		icon: true,
		name: 'News',
		url: '#',
	},
};
