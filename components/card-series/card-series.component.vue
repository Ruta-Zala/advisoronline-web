<template>
	<div
		class="relative"
		:class="{
			'text-white-100': props.variant === 'dark',
			'text-dark-100': props.variant === 'light',
		}"
	>
		<div
			class="relative mb-2 flex h-48 items-center justify-center overflow-hidden"
			:class="{
				'bg-white-100': props.variant === 'dark',
				'bg-grey-200': props.variant === 'light',
			}"
		>
			<img :src="props.image" alt="" class="max-w-full" />
			<div
				class="absolute right-0 top-0 flex items-center gap-2.5 px-2.5 py-2 text-dark-100"
				:class="{
					'bg-white-100': props.variant === 'dark',
					'bg-grey-200': props.variant === 'light',
				}"
			>
				<IconList class="h-4 w-4" />
				<span class="text-xs font-semibold">{{ props.count }}</span>
			</div>
		</div>
		<a :href="props.url" class="after:absolute after:inset-0">
			<h3
				class="mb-2 truncate font-serif text-xl font-medium"
				:title="props.title"
			>
				{{ props.title }}
			</h3>
		</a>
		<p class="line-clamp-3 text-sm" :title="props.description">
			{{ props.description }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { ThemeVariant } from '~/constants/theme-variant';
import { IconList } from '~/icons';

export interface CardSeriesProps {
	url: string;
	title: string;
	description: string;
	count: number;
	image: string;
	variant?: ThemeVariant;
}

const props = withDefaults(defineProps<CardSeriesProps>(), {
	variant: 'light',
});
</script>
