<template>
	<div class="row flex items-center pb-8">
		<div class="w-full lg:col-9">
			<div class="text-center lg:text-left">
				<Breadcrumbs v-bind="breadcrumbsArgs" dark />
				<h1 class="font-serif text-[34px] font-semibold text-white-100 lg:py-2">
					{{ title }}
				</h1>
			</div>
		</div>
		<div class="w-full lg:col-3">
			<div
				class="mx-auto mb-8 mt-6 flex h-[140px] w-[300px] items-center justify-center bg-white-100 p-5 lg:ml-auto lg:mr-0"
			>
				<img :src="image" alt="Partner logo" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';

const props = defineProps<{
	title: string;
	image: string;
}>();
const { t } = useI18n();

const breadcrumbsArgs = computed(() => ({
	list: [
		{ name: t('shared.professional'), url: '/professional' },
		{ name: t('shared.partners'), url: '/professional/partners' },
	],
	current: props.title,
}));
</script>
