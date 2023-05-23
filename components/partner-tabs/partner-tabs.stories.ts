import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import Block, { PartnerTabsProps } from './partner-tabs.component.vue';

export default {
	title: 'Components / Partner Tabs',
	component: Block,
} satisfies Meta<PartnerTabsProps>;

const html = String.raw;

export const PartnerTabs: StoryFn = () => {
	return defineComponent({
		components: { Block },
		setup: () => {
			const activeTab = ref(0);
			const tabs = ['Generali', 'The society', 'Investment Ideas', 'Insights'];

			return { tabs, activeTab };
		},
		template: html`
			<div class="space-x-4">
				<Block :tabs="tabs" v-model="activeTab" />
			</div>
		`,
	});
};
