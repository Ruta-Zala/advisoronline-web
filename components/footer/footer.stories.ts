import { Meta, StoryFn } from '@storybook/vue3';
import Block from './footer.component.vue';

export default {
	title: 'Components / Footer',
	component: Block,
	parameters: { layout: 'none' },
} satisfies Meta;

export const Footer: StoryFn = () => Block;
