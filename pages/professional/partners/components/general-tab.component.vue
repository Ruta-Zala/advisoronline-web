<template>
	<Container>
		<div class="row">
			<div class="w-full lg:col-9">
				<img
					:src="featuredImage"
					:alt="featuredImage"
					class="max-h-[536px] w-full object-cover"
				/>
				<h2
					class="my-4 text-center font-serif text-[21px] font-semibold tracking-wide"
				>
					{{ shortDescription }}
				</h2>
				<hr class="m-auto my-10 w-20 text-red-100" />

				<Markup
					class="prose mb-12 max-w-full leading-7 tracking-wide text-dark-100"
					:html="description"
				/>

				<GetSwiper v-slot="{ swiper, onSwiper }">
					<BlockHeader :title="featured.title" class="mb-4" bold>
						<template #append>
							<Controls
								@controls-prev="swiper?.slidePrev()"
								@controls-next="swiper?.slideNext()"
							/>
						</template>
					</BlockHeader>
					<div class="mb-4 flex flex-col gap-4 md:flex-row">
						<template v-if="featured.highlighted">
							<CardBlockOne v-bind="featured.highlighted" class="md:w-1/2" />
						</template>

						<Swiper class="w-full md:w-1/2" @swiper="onSwiper">
							<SwiperSlide
								v-for="(chunkPart, chunkIndex) in chunk(featured.articles, 3)"
								:key="chunkIndex"
								class="space-y-5 md:space-y-3"
							>
								<CardTwo
									v-for="(item, index) in chunkPart"
									v-bind="item"
									:key="index"
									image-size="small"
									class="border-b border-grey-100 pb-4 last:border-0 md:pb-2"
								/>
							</SwiperSlide>
						</Swiper>
					</div>
					<a
						v-if="false"
						:href="featured.viewMoreUrl"
						class="block text-right text-xs font-semibold"
					>
						{{ t('shared.view-more') }}
					</a>
				</GetSwiper>
				<div class="my-8 space-y-14">
					<div>
						<BlockHeader
							:title="t('professional.partner.latest-publications')"
							class="mb-4"
						/>
						<div class="space-y-2 divide-y divide-grey-100">
							<CardTwo
								v-for="item in publications"
								:key="item.id"
								:title="item.title"
								:image="item.image"
								image-size="medium"
								:category="item.category"
								:description="item.shortDescription"
								:url="item.url"
							/>
						</div>
						<a
							v-if="false"
							href="#"
							class="mb-4 mt-3.5 block text-right text-xs font-semibold"
						>
							{{ t('shared.view-more') }}
						</a>
					</div>
				</div>
			</div>
			<div class="w-full lg:col-3">
				<slot />
			</div>
		</div>
		<div class="row container-cancel">
			<NewsMagazine />
		</div>
	</Container>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import Container from '~/components/container/container.component.vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardBlockOne from '~/components/card-block-one/card-block-one.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import Markup from '~/components/markup/markup.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import { PartnersDetailsQuery } from '../[partnerSlug].query';
import { InsightContentDocument } from '../[partnerSlug]-second.query';

const props = defineProps<{
	data: PartnersDetailsQuery;
}>();

const { t } = useI18n();
const dateFormat = useDateFormatter();

const { data: contentData, error: contentError } = await useAsyncQuery(
	InsightContentDocument,
	{ tag: 'professional', page: 1, pageSize: 5 },
);

if (contentError.value) {
	throw createError(contentError.value);
}

const partner = computed(() => props.data?.siteManagerPartners?.data.at(0));
const featuredImage = computed(() =>
	getImageUrl(partner.value?.attributes?.featuredImage?.data),
);
const shortDescription = computed(() => partner.value?.attributes?.excerpt);
const description = computed(
	() => partner.value?.attributes?.description || '',
);

const featured = computed(() => {
	const featuredBox = partner.value?.attributes?.featuredBox;

	const featuredTag = featuredBox?.featured_tag?.data;
	const featuredArticles = featuredTag?.attributes?.contents?.data ?? [];
	const highlighted = featuredArticles.map((item) => ({
		size: 'small' as const,
		image: getImageUrl(item.attributes?.cover?.data),
		category: getCategoryInfo(item.attributes?.category?.data).name,
		title: item.attributes?.title || '',
		date: dateFormat(item.attributes?.publishedAt),
		url: getContentUrl(item),
		description: item.attributes?.short_description || '',
	}));

	const articlesTag = featuredBox?.articles_tag?.data;
	const articles = articlesTag?.attributes?.contents?.data ?? [];

	return {
		title: featuredBox?.title || '',
		viewMoreUrl: '#',
		highlighted: highlighted.at(0),
		articles: articles.map((item) => ({
			size: 'small' as const,
			image: getImageUrl(item.attributes?.cover?.data),
			category: getCategoryInfo(item.attributes?.category?.data).name,
			title: item.attributes?.title || '',
			date: dateFormat(item.attributes?.publishedAt),
			url: getContentUrl(item),
		})),
	};
});

const publications = computed(() => {
	const entities = contentData.value?.contents?.data ?? [];
	return entities.filter(isValidEntity).map((item) => ({
		id: item.id,
		title: item.attributes.title,
		shortDescription: item.attributes.short_description ?? '',
		category: getCategoryInfo(item.attributes.category?.data).name,
		image: getImageUrl(item.attributes.cover?.data),
		url: getContentUrl(item),
	}));
});
</script>
