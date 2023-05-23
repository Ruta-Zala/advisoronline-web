import { Meta } from '@storybook/vue3';
import Block, { StepperProps } from './stepper.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Stepper',
	component: Block,
	args: {
		steps: [
			{
				name: 'account',
				status: 'completed',
			},
			{
				name: 'details',
				status: 'active',
			},
			{
				name: 'preferences',
				status: 'idle',
			},
		],
	},
} satisfies Meta<StepperProps>;

export const Stepper = createDefaultStory(Block);
