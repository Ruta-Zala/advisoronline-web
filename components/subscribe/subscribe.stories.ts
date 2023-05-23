import { Meta } from '@storybook/vue3';
import Block, { SubscribeProps } from './subscribe.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Subscribe',
	component: Block,
	args: {
		title: 'No Subscription / Free Account',
		description:
			'Discover the 4 reasons to subscribe to ADVISOR and ADVISOR PRIVATE magazines from today also in DIGITAL version to always have them with you.ò',
		price: 18,
		link: '#',
	},
} satisfies Meta<SubscribeProps>;

export const Subscribe = createDefaultStory(Block);
