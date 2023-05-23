import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import Block, { PaginationProps } from './pagination.component.vue';

export default {
	title: 'Components / Pagination',
	component: Block,
	args: {
		pages: 22,
		modelValue: 2,
	},
} satisfies Meta<PaginationProps>;

const html = String.raw;

export const Pagination: StoryFn = (args) => {
	return defineComponent({
		components: { Block },
		setup() {
			const current = ref(args.modelValue);
			return { args, current };
		},
		template: html`<Block v-model="current" :pages="args.pages" />`,
	});
};
