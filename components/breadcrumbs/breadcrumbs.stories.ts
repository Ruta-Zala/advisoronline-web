import { Meta } from '@storybook/vue3';
import Block, { BreadcrumbsProps } from './breadcrumbs.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Breadcrumbs',
	component: Block,
	args: {
		list: [
			{
				name: 'Previous',
				url: '#',
			},
			{
				name: 'Topics',
				url: '#',
			},
		],
		current: 'Financial advisors',
	},
} satisfies Meta<BreadcrumbsProps>;

export const Breadcrumbs = createDefaultStory(Block);
