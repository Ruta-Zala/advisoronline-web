import { Meta } from '@storybook/vue3';
import { defineComponent } from 'vue';
import * as IconsModules from './index';

const icons = Object.entries(IconsModules);

export default {
	title: 'Icons',
} satisfies Meta;

const html = String.raw;

export const Icons = () => {
	return defineComponent({
		setup: () => ({ icons }),
		template: html`
			<ul class="flex flex-wrap gap-2">
				<li
					v-for="[name, icon] in icons"
					class="inline-flex items-center gap-3 border border-grey-100 py-2 pl-2 pr-3"
				>
					<component
						:is="icon"
						class="inline-block h-10 w-10 border border-dashed text-red-200"
					/>
					<span>{{name}}</span>
				</li>
			</ul>
		`,
	});
};
