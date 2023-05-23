<template>
	<div class="flex flex-col md:flex-row-reverse">
		<div class="relative shrink-0 md:w-1/2">
			<p
				class="absolute left-0 top-0 bg-white-100 px-2 py-1 text-sm font-medium text-dark-100"
			>
				{{ videoDuration }}
			</p>
			<iframe class="h-60 w-full md:h-full" :src="url" allowfullscreen />
		</div>
		<div
			class="flex flex-col justify-center bg-dark-200 px-5 py-7 text-white-100 md:w-1/2 md:py-20"
		>
			<h2 class="font-serif text-[21px] font-medium tracking-wide md:text-xl">
				{{ title }}
			</h2>
			<p class="my-5 text-sm font-light tracking-wider">{{ description }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
export interface CardVideoOneProps {
	url: string;
	videoDuration: string;
	title: string;
	description: string;
}

defineProps<CardVideoOneProps>();
</script>
