import { Meta, StoryObj } from '@storybook/vue3';
import Block, { ContactCardProps } from './contact-card.component.vue';

export default {
	title: 'Components / Contact Card',
	component: Block,
} satisfies Meta<ContactCardProps>;

export const ContactCard: StoryObj<ContactCardProps> = {
	args: {
		location: '2b Rue Nicolas Bové, 1253 Lussemburgo',
		phone: '+35 227862620',
		email: 'client_services@generali.lu',
		website: 'www.generali.lu/it',
		linkedIn: 'Linkedin',
	},
};
