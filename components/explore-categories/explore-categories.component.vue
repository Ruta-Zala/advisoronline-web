<template>
	<div>
		<p class="mb-6 text-xs font-semibold uppercase tracking-wide text-red-100">
			{{ props.title }}
		</p>
		<div class="grid gap-2 sm:grid-cols-3 md:grid-cols-4">
			<CardCategory
				v-for="category in props.categories"
				:key="category.name"
				v-bind="category"
			/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import CardCategory from '~/components/card-category/card-category.component.vue';

export interface ExploreCategoriesProps {
	title?: string;
	categories: Array<{
		image: string;
		name: string;
		url: string;
	}>;
}

const props = withDefaults(defineProps<ExploreCategoriesProps>(), {
	title: `explore our categories`,
});
</script>
