import { Meta } from '@storybook/vue3';
import Block, {
	SubscribeNewsletterSidebarProps,
} from './subscribe-newsletter-sidebar.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Subscribe Newsletter Sidebar',
	component: Block,
	args: {
		subscribeLink: '#',
		dark: false,
	},
} satisfies Meta<SubscribeNewsletterSidebarProps>;

export const SubscribeNewsletterSidebar = createDefaultStory(Block);
