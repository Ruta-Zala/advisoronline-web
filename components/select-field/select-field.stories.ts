import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import Block, { SelectFieldProps } from './select-field.component.vue';

export default {
	title: 'Inputs / Select Field',
	component: Block,
	args: {
		options: [
			{
				text: 'Option 1',
				value: 'option1',
			},
			{
				text: 'Option 2',
				value: 'option2',
			},
		],
	},
} satisfies Meta<SelectFieldProps>;

const html = String.raw;

export const SelectField: StoryFn = (args) => {
	return defineComponent({
		components: { Block },
		setup: () => ({ args }),
		template: html`
			<div class="space-y-4">
				<Block v-bind="args" label="Label" />
				<Block v-bind="args" />
			</div>
		`,
	});
};
