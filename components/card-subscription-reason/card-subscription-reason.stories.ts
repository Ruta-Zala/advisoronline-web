import { Meta } from '@storybook/vue3';
import Block, {
	CardSubscriptionReasonProps,
} from './card-subscription-reason.component.vue';
import { createDefaultStory } from '~/utils/storybook';
import {
	IconChartBar,
	IconRefresh,
	IconTrendingUp,
	IconUserNormal,
} from '~/icons';

export default {
	title: 'Components / Card Subscription Reason',
	component: Block,
	args: {
		title: 'All good reasons why Advisor Magazine is a must have!',
		description: 'You can also costumize the subscription to your needs',
		list: [
			{
				icon: IconTrendingUp,
				title: 'A unique editorial proposal',
				highlightWords: 2,
				description:
					'Open Financial Communication is the only company to offer a wide and varied editorial offer dedicated exclusively to the world of financial advice and managed savings.',
			},
			{
				icon: IconChartBar,
				title: '15 years market authority',
				highlightWords: 2,
				description:
					'We speak exclusively to financial advisors , private bankers and all operators active in the world of managed savings. A story that has led the main sector associations to choose us as media partners for large institutional events',
			},
			{
				icon: IconRefresh,
				title: 'Stay updated with current changes on economics',
				highlightWords: 2,
				description:
					'With the  DIGITAL version  in  preview  compared to the paper ADVISOR and ADVISOR PRIVATE are your indispensable tools to always have a  timely and updated picture  on the economic events that affect your work.',
			},
			{
				icon: IconUserNormal,
				title: 'Independent thinking and view',
				highlightWords: 1,
				description:
					'We offer and guarantee you the materials of reflection and analysis necessary to create a personal independent point of view, just as our publishing house Open Financial Communication is independent .',
			},
		],
	},
} satisfies Meta<CardSubscriptionReasonProps>;

export const CardSubscriptionReason = createDefaultStory(Block);
