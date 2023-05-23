import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import Block from './text-field.component.vue';
import IconSearch from '~/icons/icon-search.component.vue';

export default {
	title: 'Inputs / TextField',
	component: Block,
} satisfies Meta;

const html = String.raw;

export const TextField: StoryFn = () => {
	return defineComponent({
		components: { Block },
		setup() {
			return { IconSearch };
		},
		template: html`<div class="space-y-3">
			<Block :icon="IconSearch" iconPosition="left" label="Search" />
			<Block :icon="IconSearch" iconPosition="right" placeholder="Search" />
		</div>`,
	});
};
