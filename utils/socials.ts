import { Component } from 'vue';
import IconFacebook from '~/icons/icon-facebook.component.vue';
import IconLinkedin from '~/icons/icon-linkedin.component.vue';
import IconTwitter from '~/icons/icon-twitter.component.vue';

type Social = {
	name: string;
	url: string;
	icon: Component;
};

export const socials: Social[] = [
	{
		name: 'facebook',
		url: 'https://www.facebook.com/Advisor.Ofc',
		icon: IconFacebook,
	},
	{
		name: 'linkedin',
		url: 'https://www.linkedin.com/company/advisor---open-financial-communication/',
		icon: IconLinkedin,
	},
	{
		name: 'twitter',
		url: 'https://twitter.com/ADVISOR_ONLINE',
		icon: IconTwitter,
	},
];
