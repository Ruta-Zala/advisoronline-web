<template>
	<div
		class="relative"
		:class="{
			'text-white-100': props.variant === 'dark',
			'text-dark-100': props.variant === 'light',
		}"
	>
		<p
			class="absolute left-0 top-0 bg-white-100 px-2 py-1 text-[13px] font-medium text-dark-100"
		>
			<span v-if="props.category">{{ props.category }} | </span>
			{{ props.videoDuration }}
		</p>
		<img
			v-if="props.thumbnail"
			:src="props.thumbnail"
			class="aspect-video w-full object-cover"
		/>
		<iframe
			v-else
			class="aspect-video w-full bg-dark-300"
			:src="autoPlayURL(props.url)"
			allowfullscreen
		/>
		<h2 class="my-4 line-clamp-4 font-serif text-lg tracking-wider">
			{{ props.title }}
		</h2>
		<p class="text-[13px] font-medium tracking-wide text-grey-100">
			{{ props.footerText }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { autoPlayURL } from '~/utils/autoplay-url';
import { ThemeVariant } from '~/constants/theme-variant';

export interface CardVideoTwoProps {
	url: string;
	category?: string;
	videoDuration: string;
	title: string;
	footerText: string;
	variant?: ThemeVariant;
	thumbnail?: string;
}

const props = withDefaults(defineProps<CardVideoTwoProps>(), {
	variant: 'light',
	category: undefined,
	thumbnail: undefined,
});
</script>
