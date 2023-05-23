import { Meta, StoryObj } from '@storybook/vue3';
import Block from './card-subscription.component.vue';
import { CardSubscriptionProps } from './card-subscription.component.vue';

export default {
	title: 'Components / Card Subscription',
	component: Block,
	argTypes: { onSubscribe: { action: 'subscribed' } },
	args: {
		name: 'Advisor Magazine',
		contents: [
			'All the releases of the last 12 months available',
			'Digital access',
		],
		consumerChoice: true,
		options: [
			{
				id: '3',
				text: '3 Months',
				description: `Trimestrial subscription to ADVISOR News Magazine and AP ADVISOR Private`,
				months: 3,
				price: 24,
				disabled: true,
			},
			{
				id: '6',
				text: '6 Months',
				description: `Trimestrial subscription to ADVISOR News Magazine and AP ADVISOR Private`,
				months: 6,
				price: 32,
				disabled: false,
			},
			{
				id: '12',
				text: '12 Months',
				description: `Annual subscription to ADVISOR News Magazine and AP ADVISOR Private`,
				months: 12,
				price: 44,
				disabled: false,
			},
		],
	} satisfies CardSubscriptionProps,
} satisfies Meta;

export const CardSubscription: StoryObj<CardSubscriptionProps> = {};
