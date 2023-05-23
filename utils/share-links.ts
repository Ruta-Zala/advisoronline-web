import { Component } from 'vue';
import { SFacebook, SLinkedIn, STwitter, SEmail, SWhatsApp } from 'vue-socials';
import {
	IconFacebook,
	IconLinkedin,
	IconTwitter,
	IconMail,
	IconWhatsapp,
} from '~/icons';

type Share = {
	icon: Component;
	component: Component;
};

export const share: Share[] = [
	{
		component: SFacebook,
		icon: IconFacebook,
	},
	{
		component: SLinkedIn,
		icon: IconLinkedin,
	},
	{
		component: STwitter,
		icon: IconTwitter,
	},
	{
		component: SEmail,
		icon: IconMail,
	},
	{
		component: SWhatsApp,
		icon: IconWhatsapp,
	},
];
