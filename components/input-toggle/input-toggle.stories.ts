import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import Block from './input-toggle.component.vue';

export default {
	title: 'Inputs / Toggle',
	component: Block,
} satisfies Meta;

const html = String.raw;

export const Toggle: StoryFn = () => {
	return defineComponent({
		components: { Block },
		setup() {
			const smallToggle = ref(false);
			const bigToggle = ref(false);
			return { smallToggle, bigToggle };
		},
		template: html` <div class="space-x-4">
			<Block v-model="smallToggle"></Block>
			<Block v-model="bigToggle" size="large"></Block>
		</div>`,
	});
};
