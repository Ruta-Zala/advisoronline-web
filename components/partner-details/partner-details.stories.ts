import { Meta, StoryObj } from '@storybook/vue3';
import Block, { PartnerDetailsProps } from './partner-details.component.vue';
import blackRockLogo from '~/assets/partners-logos/pro-blackrock.svg';
import { themeVariantArgType } from '~~/constants/theme-variant';

export default {
	title: 'Components / Partner Details',
	component: Block,
	parameters: { layout: 'none' },
	argTypes: { variant: themeVariantArgType },
} satisfies Meta<PartnerDetailsProps>;

export const PartnerDetails: StoryObj<PartnerDetailsProps> = {
	args: {
		name: 'BlackRock',
		image: blackRockLogo,
		description: `Generali Investments è tra i maggiori attori nell’Asset Management in Europa, 
		con un modello di business fondato sul talento e sulla specializzazione attraverso un’innovativa 
		piattaforma Multi-boutique. Generali Investments condivide il forte impegno del Gruppo attraverso 
		una vasta gamma di approcci ESG seguiti con coscienza e rigore dalle boutique specializzate della 
		sua piattaforma.`,
	},
};
