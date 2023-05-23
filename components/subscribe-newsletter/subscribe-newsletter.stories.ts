import { Meta } from '@storybook/vue3';
import Block, {
	SubscribeNewsletterProps,
} from './subscribe-newsletter.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Subscribe Newsletter',
	component: Block,
	args: {
		subscribeLink: '#',
	},
} satisfies Meta<SubscribeNewsletterProps>;

export const SubscribeNewsletter = createDefaultStory(Block);
