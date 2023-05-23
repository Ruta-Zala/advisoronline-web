import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import Block from './input-checkbox.component.vue';

export default {
	title: 'Inputs / Checkbox',
	component: Block,
} satisfies Meta;

const html = String.raw;

export const Checkbox: StoryFn = () => {
	return defineComponent({
		components: { Block },
		setup() {
			const checked = ref(false);
			return { checked };
		},
		template: html`<div class="space-x-4">
			<Block v-model="checked" />
			<Block v-model="checked" variant="secondary" />
		</div>`,
	});
};
