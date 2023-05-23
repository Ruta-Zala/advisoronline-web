import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import Block, { AccordionProps } from './accordion.component.vue';

export default {
	title: 'Components / Accordion',
	component: Block,
} satisfies Meta<AccordionProps>;

const html = String.raw;

export const Accordion: StoryFn = () => {
	return defineComponent({
		components: { Block },
		setup: () => {
			const list = [
				{
					title: 'Can I cancel my subscription?',
					body: 'No! the subscriptions is one time pay for the specified amount fo time. At the end of that period your subscription will auotmaticaly renew for nother similar period of time. However, you can revoke the auto renewal at any point.',
				},
				{
					title: 'Can I upgrade my plan?',
					body: 'No! the subscriptions is one time pay for the specified amount fo time. At the end of that period your subscription will auotmaticaly renew for nother similar period of time. However, you can revoke the auto renewal at any point.',
				},
				{
					title: 'Do i need to have auto-renew enabled?',
					body: 'No! the subscriptions is one time pay for the specified amount fo time. At the end of that period your subscription will auotmaticaly renew for nother similar period of time. However, you can revoke the auto renewal at any point.',
				},
			];
			return { list };
		},
		template: html`
			<div>
				<Block v-for="item in list" :title="item.title">
					{{ item.body }}
				</Block>
			</div>
		`,
	});
};
