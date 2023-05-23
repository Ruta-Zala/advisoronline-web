import { Meta, StoryObj } from '@storybook/vue3';
import Component, { UserOfferProps } from './user-offer.component.vue';
import { IconLock } from '~/icons';

export default {
	title: 'Components / User Offer',
	component: Component,
	parameters: { layout: 'none' },
} satisfies Meta<UserOfferProps>;

export const UserOffer: StoryObj<UserOfferProps> = {
	args: {
		icon: IconLock,
		title: 'Stay updated with exclusive content. Register for Free',
		description: `Unlock additional features and access our<br />
        <span class="text-red-100"
            >Current full magazine for 6 months totally free</span
        >`,
		offers: [
			'Access free magazines samples',
			'Read exclusive articles',
			'Follow news',
			'Receive notifications',
		],
		loginText: 'Sign In / Login',
	},
};
