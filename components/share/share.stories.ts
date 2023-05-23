import { Meta } from '@storybook/vue3';
import Block, { ShareProps } from './share.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Share',
	component: Block,
	args: {
		shareOptions: {
			url: 'https://advisor.jagaad.dev/risparmio-gestito/69650-obbligazionario-dove-trovare-valore-tra-gli-investment-grade',
			body: 'Advisor online',
			text: 'Advisor online content',
		},
		dark: false,
	},
} satisfies Meta<ShareProps>;

export const Share = createDefaultStory(Block);
