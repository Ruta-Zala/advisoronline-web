import { Meta } from '@storybook/vue3';
import Block from './searchbar.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Searchbar',
	component: Block,
	args: {},
} satisfies Meta;

export const Searchbar = createDefaultStory(Block);
