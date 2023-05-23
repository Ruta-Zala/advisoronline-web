<template>
	<Container>
		<div class="row">
			<div class="w-full lg:col-9">
				<BlockHeader :title="title" />
				<div class="space-y-2 divide-y divide-grey-100">
					<CardOne
						v-for="item in items"
						:key="item.id"
						class="py-6"
						:title="item.title"
						:description="item.shortDescription"
						:url="item.url"
						:category="convertSlugToString(item.category)"
						:image="item.image"
					/>
				</div>
				<div
					class="flex justify-center border-t border-grey-100 border-opacity-50 py-12"
				>
					<Pagination v-if="pages > 1" v-model="page" :pages="pages" />
				</div>
			</div>
			<div class="w-full lg:col-3">
				<slot />
			</div>
		</div>
		<div class="container-cancel">
			<SectionThree v-slot="slide" v-bind="sectionThreeArgs">
				<CardVideoSeries v-bind="slide" />
			</SectionThree>
			<NewsMagazine />
		</div>
	</Container>
</template>
<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import Container from '~/components/container/container.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import CardOne from '~/components/card-one/card-one.component.vue';
import Pagination from '~/components/pagination/pagination.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import CardVideoSeries from '~/components/card-video-series/card-video-series.component.vue';
import { WatchCallback } from 'vue';
import { ComponentSharedInsights } from '~/types/graphql';
import { InsightContentDocument } from '../[partnerSlug]-second.query';

const props = defineProps<{
	data: ComponentSharedInsights;
}>();

const { t } = useI18n();

const tag = computed(() => props.data.content_list?.data?.attributes?.name);
const page = ref(0);
const queryPage = computed(() => page.value + 1);

const {
	data: contentData,
	error: contentError,
	execute,
} = await useAsyncQuery(
	InsightContentDocument,
	reactive({ tag, page: queryPage, pageSize: 12 }),
);

if (contentError.value) {
	throw createError(contentError.value);
}

const pages = computed(() => {
	const pagination = contentData.value?.contents?.meta.pagination;
	return pagination?.pageCount ?? 0;
});

const onPageChange: WatchCallback<number, number> = () => {
	execute();
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(page, onPageChange, { flush: 'post' });

const title = computed(() => props.data.tab_title || '');
const items = computed(() => {
	const entities = (contentData.value?.contents?.data ?? [])
		.filter(isValidEntity)
		.slice(0, props.data.number_of_items_to_show ?? 9);

	return entities.map((item) => ({
		id: item.id,
		title: item.attributes.title,
		shortDescription: item.attributes.short_description ?? '',
		category: getCategoryInfo(item.attributes.category?.data).name,
		image: getImageUrl(item.attributes.cover?.data),
		url: getContentUrl(item),
	}));
});

const sectionThreeArgs = {
	category: 'UP & DOWN',
	image: getFakeImage(),
	video: {
		title: 'Effetto "rock" sul Salone del Risparmio',
		url: 'https://www.youtube.com/embed/CS8wbTr1n-c',
		date: '05/05/2022',
	},
	slider: {
		title: t('shared.advisor-videos'),
		list: Array.from({ length: 5 }, () => ({
			id: faker.datatype.uuid(),
			url: '#',
			videoNumber: 13,
			category: 'Interviews',
			duration: '10 - 20min',
			title: 'The “traditional” interview style focused on financial world',
			image: getFakeImage(),
		})),
	},
	link: {
		text: t('shared.explore-videos'),
		url: '#',
	},
};
</script>
