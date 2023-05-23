<template>
	<ArticlesList
		v-model:page="page"
		:title="title"
		:breadcrumbs="breadcrumbs"
		:pages="pages"
		:items="items"
		:categories="categories"
		:most-read="mostRead"
	/>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ArticlesList from '~/pages/components/articles-list.component.vue';
import { CategoryArticlesDocument } from './index.query';
import { Ref, WatchCallback } from 'vue';
import { convertSlugToString } from '~/utils/convert-slug-to-string';

const { t } = useI18n();
const router = useRouter();
const { params, query } = useRoute();
// For some reason WebStorm does not recognise the type without this
const page: Ref<number> = ref(parseNumber(query.page, 1) - 1);
const queryPage = computed(() => page.value + 1);
const categorySlug = computed(() => {
	const slug = params.categorySlug;
	return slug === 'uncategorized' ? null : slug;
});

const variables = reactive({ page: queryPage, categorySlug });
const { data, error, execute } = await useAsyncQuery(
	CategoryArticlesDocument,
	variables,
);

if (error.value) {
	throw createError(error.value);
}

const pages = computed(() => {
	const pagination = data.value?.contents?.meta.pagination;
	return pagination?.pageCount ?? 0;
});

const onPageChange: WatchCallback<number, number> = (newPage) => {
	execute();
	router.push({ query: { page: newPage + 1 } });
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(page, onPageChange, { flush: 'post' });

const title = computed(() =>
	convertSlugToString(
		data.value?.currentCategory?.data.at(0)?.attributes?.name,
	),
);

const breadcrumbs = computed(() => ({
	list: [{ name: t('news'), url: '#' }],
	current: title.value,
}));

const items = computed(() => {
	const entities = (data.value?.contents?.data ?? []).filter(isValidEntity);
	return entities.map((item) => ({
		id: item.id,
		title: item.attributes?.title,
		shortDescription: item.attributes?.short_description ?? '',
		category: getCategoryInfo(item.attributes?.category?.data).name,
		image: getImageUrl(item.attributes.cover?.data),
		url: getContentUrl(item),
	}));
});

const categories = computed(() => {
	const entities = (data.value?.categories?.data ?? []).filter(isValidEntity);
	return entities.map((entity) => ({
		image: getFakeImage(),
		name: convertSlugToString(entity.attributes.name),
		url: `/${entity.attributes.slug}`,
	}));
});

const mostRead = computed(() => {
	const entities = (data.value?.mostRead?.data ?? []).filter(isValidEntity);
	return entities.map((entity) => ({
		id: entity.id,
		title: entity.attributes.title,
		category: getCategoryInfo(entity.attributes.category?.data).name,
		url: getContentUrl(entity),
	}));
});
</script>
