import { Meta, StoryObj } from '@storybook/vue3';
import Component, {
	MarkupProps as ComponentProps,
} from './markup.component.vue';

const html = String.raw;

export default {
	title: 'Components / Markup',
	component: Component,
	args: {
		html: html`
			<div style="background-color: cyan; padding: 2rem;">
				<p style="color: blue; text-align: center; font-weight: 700;">
					Lorem ipsum dolor sit amet!
				</p>
			</div>
			<div style="background-color: cyan; padding: 2rem;">
				<p style="color: blue; text-align: center;">
					Lorem ipsum dolor sit amet!
				</p>
			</div>
		`,
	},
} as Meta<ComponentProps>;

export const Markup: StoryObj = {};
