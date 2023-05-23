<template>
	<div
		class="inline-flex flex-wrap items-center justify-center gap-y-3 divide-x divide-grey-100 text-xs font-semibold uppercase"
		:class="{ 'text-dark-100': !dark, 'text-white-100': dark }"
	>
		<a
			v-for="item in list"
			:key="item.name"
			:href="item.url"
			class="px-4 py-1.5"
			>{{ item.name }}</a
		>
		<h4 class="px-4 py-1.5 text-grey-100">{{ current }}</h4>
	</div>
</template>

<script lang="ts" setup>
export interface BreadcrumbsProps {
	list: Array<{
		name: string;
		url: string;
	}>;
	current: string;
	dark?: boolean;
}

defineProps<BreadcrumbsProps>();
</script>
