import { Meta } from '@storybook/vue3';
import Block, { FollowShareProps } from './follow-share.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Follow Share',
	component: Block,
	args: {
		follow: {
			saved: false,
			liked: true,
			read: true,
		},
		shareOptions: {
			url: 'https://advisor.jagaad.dev/risparmio-gestito/69650-obbligazionario-dove-trovare-valore-tra-gli-investment-grade',
			body: 'Advisor online',
			text: 'Advisor online content',
		},
	},
} satisfies Meta<FollowShareProps>;

export const FollowShare = createDefaultStory(Block);
