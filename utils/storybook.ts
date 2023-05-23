import { Args, StoryFn } from '@storybook/vue3';
import { Component, defineComponent } from 'vue';
import * as Icons from '../icons';

export function createDefaultStory<TArgs = Args>(
	Block: Component,
): StoryFn<TArgs> {
	return (args: TArgs) => {
		return defineComponent({
			components: { Block },
			setup: () => ({ args }),
			template: `<Block v-bind="args" />`,
		});
	};
}

export const IconsControl = () => ({
	control: 'select',
	options: Object.keys(Icons),
	mapping: Icons,
});

const html = String.raw;

const ColumnsMap = {
	6: 'col-2',
	4: 'col-3',
	3: 'col-4',
	2: 'col-6',
};

export const decoratorColumns = (columns: 2 | 3 | 4 | 6 = 4) => {
	return () => ({
		inheritAttrs: false,
		template: html`
			<div
				class="p-4"
				:class="{
					'bg-dark-100': $attrs.variant === 'dark',
					'bg-white-100': $attrs.variant === 'light'
				}"
			>
				<div class="row">
					<div class="${ColumnsMap[columns]}" v-for="i in ${columns}">
						<story v-bind="$attrs" />
					</div>
				</div>
			</div>
		`,
	});
};
