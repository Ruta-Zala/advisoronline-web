<template>
	<a :href="url" class="block">
		<img
			:src="image"
			alt="Image"
			class="mb-6 h-52 w-full object-cover lg:h-60"
		/>
		<h4 v-if="category" class="mb-2 text-[13px] font-bold tracking-wide">
			{{ category }}
		</h4>
		<h2 class="mb-2 font-serif text-[21px] font-semibold tracking-wide">
			{{ title }}
		</h2>
		<p v-if="description" class="mb-4 text-sm font-medium">
			<!-- Hydration text content mismatch in <p> -->
			{{ description.trim() }}
		</p>
		<h4 v-if="date" class="text-[13px] font-semibold">
			{{ date }}
		</h4>
	</a>
</template>

<script lang="ts" setup>
export interface CardThreeProps {
	image: string;
	category?: string;
	title: string;
	description?: string;
	date?: string;
	url: string;
}

defineProps<CardThreeProps>();
</script>
