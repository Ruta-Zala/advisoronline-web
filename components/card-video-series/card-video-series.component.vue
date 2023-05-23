<template>
	<a :href="url" class="relative block">
		<img
			:src="image"
			alt=""
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<div
			class="relative flex h-80 flex-col items-start justify-end bg-dark-300/80 px-6 pb-4 text-white-100"
		>
			<div
				v-if="videoNumber"
				class="absolute right-0 top-0 flex items-center gap-3 bg-dark-100 px-3.5 py-2.5"
			>
				<IconList class="h-4 w-4" />
				<p class="text-xs font-medium tracking-wider">{{ videoNumber }}</p>
			</div>
			<p class="border border-white-100 px-3.5 py-2.5 text-[13px]">
				{{ category }} | {{ duration }}
			</p>
			<h3 class="my-3 line-clamp-4 font-serif text-[21px] tracking-wider">
				{{ title }}
			</h3>
		</div>
	</a>
</template>

<script lang="ts" setup>
import IconList from '~/icons/icon-list.component.vue';

export interface CardVideoSeriesProps {
	url: string;
	videoNumber?: number;
	category: string;
	duration: string;
	title: string;
	image: string;
}

defineProps<CardVideoSeriesProps>();
</script>
