<template>
	<a :href="url" class="flex h-28 gap-2 text-white-100">
		<div class="relative h-full w-7/12 overflow-hidden">
			<IconPlayCircle
				class="absolute bottom-1/2 right-1/2 h-10 w-10 translate-x-1/2 translate-y-1/2"
			/>
			<img :src="thumbnail" class="h-full w-full object-cover" />
		</div>
		<div class="w-5/12">
			<p class="mb-2 py-1 text-[13px] tracking-wide">{{ category }}</p>
			<h6 class="line-clamp-3 font-serif font-medium tracking-wide">
				{{ title }}
			</h6>
		</div>
	</a>
</template>

<script lang="ts" setup>
import IconPlayCircle from '~/icons/icon-play-circle.component.vue';

export interface CardVideoFourProps {
	thumbnail: string;
	url: string;
	title: string;
	category: string;
}

defineProps<CardVideoFourProps>();
</script>
