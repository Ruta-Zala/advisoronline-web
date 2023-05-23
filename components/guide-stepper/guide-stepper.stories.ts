import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import Block, { GuideStepperProps } from './guide-stepper.component.vue';

export default {
	title: 'Components / Guide Stepper',
	component: Block,
	args: {},
} satisfies Meta<GuideStepperProps>;

const html = String.raw;

export const GuideStepper: StoryFn = () => {
	return defineComponent({
		components: {
			Block,
		},
		setup() {
			const isOpen = ref(true);
			return { isOpen };
		},
		template: html`
			<div>
				<button class="bg-red-100 p-3 text-white-100" @click="isOpen = true">
					Open Dialog
				</button>
				<Block v-model="isOpen" />
			</div>
		`,
	});
};
