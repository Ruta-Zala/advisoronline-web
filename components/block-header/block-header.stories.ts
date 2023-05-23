import { Meta, StoryFn } from '@storybook/vue3';
import Block, { BlockHeaderProps } from './block-header.component.vue';
import { IconsControl } from '~/utils/storybook';
import BlackRockLogo from '~/assets/partners-logos/pro-blackrock.svg';
import { IconBookmark } from '~/icons';
import { defineComponent } from 'vue';
import Controls from '~/components/controls/controls.component.vue';

export default {
	title: 'Components / Block Header',
	component: Block,
	argTypes: {
		leftIcon: IconsControl(),
	},
	args: {
		title: 'Focus Sostenibilitá',
		leftIcon: IconBookmark,
		description: "Don't miss the new releases.",
		logo: BlackRockLogo,
		hideUnderline: false,
	},
} satisfies Meta<BlockHeaderProps>;

const html = String.raw;

export const BlockHeader: StoryFn = (args) => {
	return defineComponent({
		components: {
			Block,
			Controls,
		},
		setup: () => ({ args }),
		template: html`
			<div>
				<Block v-bind="args">
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</Block>
			</div>
		`,
	});
};
