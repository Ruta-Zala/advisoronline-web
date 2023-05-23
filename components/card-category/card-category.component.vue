<template>
	<a :href="url" class="relative block w-full overflow-hidden">
		<img
			:src="image"
			alt="img"
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<h2
			class="relative line-clamp-1 bg-dark-100/70 py-12 text-center font-serif text-xl tracking-wider text-white-100"
		>
			{{ name }}
		</h2>
	</a>
</template>
<script lang="ts" setup>
export interface CardCategoryProps {
	name: string;
	image: string;
	url: string;
}

defineProps<CardCategoryProps>();
</script>
