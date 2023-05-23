<template>
	<div>
		<section class="mb-24">
			<h1 class="font-serif text-[34px]">
				<b class="font-semibold text-red-100">{{ t('private.header.head') }}</b>
				{{ t('private.header.tail') }}
			</h1>
			<div v-if="heroItems" class="my-14 flex flex-wrap gap-2 lg:flex-nowrap">
				<div class="w-full lg:w-8/12">
					<CardBlockOne
						v-if="heroItems.first"
						v-bind="heroItems.first"
						size="medium"
					/>
				</div>
				<div
					class="flex w-full flex-col gap-2 md:flex-row lg:w-4/12 lg:flex-col"
				>
					<CardBlockOne
						v-if="heroItems.second"
						v-bind="heroItems.second"
						size="small"
						class="h-full"
					/>
					<CardBlockOne
						v-if="heroItems.third"
						v-bind="heroItems.third"
						size="small"
						class="h-full"
					/>
				</div>
			</div>
		</section>

		<section class="row mb-11">
			<div class="mb-8 space-y-14 lg:col-9">
				<div class="row">
					<div v-if="columnList" class="row">
						<div class="lg:col-6">
							<template v-if="columnList.left">
								<BlockHeader :title="t('private.people-news')" class="mb-6" />
								<CardThree
									v-if="columnList.left.featured"
									:image="columnList.left.featured.image"
									:title="columnList.left.featured.title"
									:category="columnList.left.featured.category"
									:date="columnList.left.featured.date"
									:url="columnList.left.featured.url"
									:underline="false"
								/>
								<div class="space-y-2 divide-y divide-grey-100">
									<CardTwo
										v-for="item in columnList.left.items"
										:key="item.slug"
										:title="item.title"
										:url="item.url"
										:category="item.category"
									/>
								</div>
								<a
									v-if="false"
									href="#"
									class="mb-4 mt-3.5 block text-right text-xs font-semibold"
								>
									{{ t('shared.view-more') }}
								</a>
							</template>
						</div>
						<div class="lg:col-6">
							<template v-if="columnList.right">
								<BlockHeader
									:title="t('shared.strategies-news')"
									class="mb-6"
								/>
								<CardThree
									v-if="columnList.right.featured"
									:image="columnList.right.featured.image"
									:title="columnList.right.featured.title"
									:category="columnList.right.featured.category"
									:date="columnList.right.featured.date"
									:url="columnList.right.featured.url"
									:underline="false"
								/>
								<div class="space-y-2 divide-y divide-grey-100">
									<CardTwo
										v-for="item in columnList.right.items"
										:key="item.slug"
										:title="item.title"
										:url="item.url"
										:category="item.category"
									/>
								</div>
								<a
									v-if="false"
									href="#"
									class="mb-4 mt-3.5 block text-right text-xs font-semibold"
								>
									{{ t('shared.view-more') }}
								</a>
							</template>
						</div>
					</div>
				</div>
			</div>
			<div class="space-y-8 lg:col-3">
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<div
						class="absolute inset-0 flex items-center justify-center bg-grey-200 text-dark-100"
					>
						{{ t('shared.ad-space') }}
					</div>
				</div>
				<SubscribeNewsletterSidebar
					v-if="!userInfo?.newsletterEnabled"
					:title="t('subscribe-newsletter.title')"
					:subtitle="t('subscribe-newsletter-sidebar.subtitle')"
					:subscribe-link="getSubscribeLink(userInfo)"
				/>
			</div>
		</section>

		<div class="container-cancel relative mb-14 h-[300px]">
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>

		<section class="row mb-12">
			<div class="space-y-12 lg:col-9">
				<template v-if="newsSliderArgs">
					<div v-if="newsSliderArgs.list.length">
						<GetSwiper v-slot="{ swiper, onSwiper }">
							<BlockHeader :title="newsSliderArgs.title" class="mb-6">
								<template #append>
									<Controls
										@controls-prev="swiper?.slidePrev()"
										@controls-next="swiper?.slideNext()"
									/>
								</template>
							</BlockHeader>
							<Swiper
								:space-between="20"
								:breakpoints="newsSliderArgs.sliderBreakpoints"
								@swiper="onSwiper"
							>
								<SwiperSlide
									v-for="(slide, index) in newsSliderArgs.list"
									:key="index"
								>
									<CardThree
										:id="slide.id"
										:image="slide.image"
										:category="slide.category"
										:title="slide.title"
										:description="slide.description"
										:url="slide.url"
										class="mb-4"
									/>
								</SwiperSlide>
							</Swiper>
						</GetSwiper>
					</div>
				</template>
				<div v-if="carouselFeatured" class="mb-8 bg-grey-200 p-2 sm:p-6">
					<GetSwiper v-slot="{ swiper, onSwiper }">
						<BlockHeader
							:title="carouselFeatured.title"
							:logo="carouselFeatured.logo"
							class="mb-4"
							bold
						>
							<template v-if="carouselFeatured.items.length" #append>
								<Controls
									@controls-prev="swiper?.slidePrev()"
									@controls-next="swiper?.slideNext()"
								/>
							</template>
						</BlockHeader>
						<div class="mb-4 flex flex-col gap-4 md:flex-row">
							<CardBlockOne
								v-if="carouselFeatured.featured"
								size="small"
								:image="carouselFeatured.featured.image"
								:category="carouselFeatured.featured.category"
								:title="carouselFeatured.featured.title"
								:date="carouselFeatured.featured.date"
								:url="carouselFeatured.featured.url"
								:class="{
									'md:w-1/2': carouselFeatured.items.length !== 0,
									'md:w-full': carouselFeatured.items.length === 0,
								}"
							/>
							<Swiper
								v-if="carouselFeatured.items.length !== 0"
								class="w-full md:w-1/2"
								@swiper="onSwiper"
							>
								<SwiperSlide
									v-for="(chunkPart, chunkIndex) in chunk(
										carouselFeatured.items,
										3,
									)"
									:key="chunkIndex"
									class="space-y-5 md:space-y-3"
								>
									<CardTwo
										v-for="item in chunkPart"
										:key="item.slug"
										:image="item.image"
										:title="item.title"
										:category="item.category.name"
										:url="item.url"
										image-size="small"
										class="border-b border-grey-100 pb-4 last:border-0 md:pb-2"
									/>
								</SwiperSlide>
							</Swiper>
						</div>
						<a
							v-if="false"
							href="#"
							class="block text-right text-xs font-semibold"
						>
							{{ t('shared.view-more') }}
						</a>
					</GetSwiper>
				</div>

				<div v-if="partnerSection" class="row mb-14">
					<div class="md:col-6">
						<template v-if="partnerSection.left">
							<SliderTwo
								v-if="partnerSection.left.list.length !== 0"
								v-bind="partnerSection.left"
								bold-full
							/>
						</template>
					</div>
					<div class="md:col-6">
						<template v-if="partnerSection.right">
							<SliderTwo
								v-if="partnerSection.right.list.length !== 0"
								v-bind="partnerSection.right"
								bold-full
							/>
						</template>
					</div>
				</div>
				<SubscribeNewsletter
					v-if="!userInfo?.newsletterEnabled"
					:title="t('subscribe-newsletter.title')"
					:subtitle="t('subscribe-newsletter.subtitle')"
					:subscribe-link="getSubscribeLink(userInfo)"
				/>
			</div>
			<div class="space-y-8 lg:col-3">
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<div
						class="absolute inset-0 flex items-center justify-center bg-grey-200 text-dark-100"
					>
						{{ t('shared.ad-space') }}
					</div>
				</div>
				<CardSocials />
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<div
						class="absolute inset-0 flex items-center justify-center bg-grey-200 text-dark-100"
					>
						{{ t('shared.ad-space') }}
					</div>
				</div>
				<div>
					<BlockHeader :title="t('shared.most-read')" class="mb-5" />
					<div class="space-y-2">
						<CardTwo
							v-for="(article, index) in mostRead"
							:key="article.id"
							:title="article.title"
							:category="article.category"
							:url="article.url"
							:underline="index < mostRead.length - 1"
						/>
					</div>
					<a
						v-if="false"
						href="#"
						class="mt-3.5 block text-right text-xs font-semibold"
					>
						{{ t('shared.view-all-new') }}
					</a>
				</div>
			</div>
		</section>

		<ESGFooter
			:section-three-args="sectionThreeArgs"
			:categories="categories"
		/>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import CardBlockOne from '~/components/card-block-one/card-block-one.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardThree from '~/components/card-three/card-three.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import ESGFooter from '~/pages/esg/components/esg-footer.component.vue';
import SliderTwo from '~/components/slider-two/slider-two.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import { PrivateDocument, PrivateQuery } from './index.query';

const { t } = useI18n();
const { data, error } = await useAsyncQuery(PrivateDocument, { limit: 3 });

if (error.value) {
	globalThis.console.dir(error.value);
	throw createError({
		statusCode: 500,
		statusMessage: t('error.something-went-wrong'),
	});
}

type Pages = NonNullable<PrivateQuery['siteManagerPrivateHomePages']>;
const page = computed<Pages['data'][number] | undefined>(() => {
	const maybePages = data.value?.siteManagerPrivateHomePages?.data;
	return (maybePages ?? []).at(0);
});

if (!hasRefValue(page)) {
	throw createError({
		statusCode: 404,
		statusMessage: t('shared.error.page-not-created'),
	});
}

const userInfo = useUserInfo();
const dateFormat = useDateFormatter();

const categories = computed(() => {
	const section = page.value?.attributes?.categorySelection;
	if (!section?.active) return undefined;

	const items = (section.categories?.data ?? []).filter(isValidEntity);
	return items.map(({ attributes }) => ({
		image: getFakeImage(),
		name: convertSlugToString(attributes.name),
		url: `/${attributes.slug}`,
	}));
});

const columnList = computed(() => {
	const list = page.value?.attributes?.columnList;
	if (!list?.active) return undefined;

	const [left, right] = [list.First, list.Second].map((column) => {
		if (!column) return undefined;

		const contents = column.content_list?.data?.attributes?.contents;
		const validEntities = (contents?.data ?? []).filter(isValidEntity);
		const tagContents = column.feature_article?.data?.attributes?.contents;
		const featuredContents = (tagContents?.data ?? []).filter(isValidEntity);
		const featured = featuredContents.map((entity) => ({
			title: entity.attributes?.title ?? '',
			url: getContentUrl(entity),
			date: dateFormat(entity.attributes.publishedAt),
			category: getCategoryInfo(entity.attributes?.category?.data).name,
			image: getImageUrl(entity.attributes?.cover?.data),
		}));

		return {
			title: column.title ?? 'Financial advisors',
			featured: featured.at(0),
			items: validEntities.map((entity) => ({
				slug: entity.attributes.slug,
				category: getCategoryInfo(entity.attributes?.category?.data).name,
				title: entity.attributes.title,
				date: dateFormat(entity.attributes.publishedAt),
				url: getContentUrl(entity),
			})),
		};
	});

	return { left, right };
});

const carouselFeatured = computed(() => {
	const section = page.value?.attributes?.carouselArticles;
	if (!section?.active) return undefined;

	const cItems = section.content_list?.data?.attributes?.contents;
	const items = (cItems?.data ?? [])
		.filter(isValidEntity)
		.slice(0, section.number_of_items_to_show ?? 6)
		.map((e) => ({
			slug: e.attributes.slug,
			title: e.attributes.title ?? '',
			url: getContentUrl(e),
			image: getImageUrl(e.attributes.cover?.data),
			category: getCategoryInfo(e.attributes.category?.data),
		}));

	const contents = section.featured_content_article?.data?.attributes?.contents;
	const featuredContents = (contents?.data ?? []).filter(isValidEntity);
	const featured = featuredContents.map((entity) => ({
		title: entity.attributes?.title ?? '',
		url: getContentUrl(entity),
		date: dateFormat(entity.attributes.publishedAt),
		category: getCategoryInfo(entity.attributes?.category?.data).name,
		image: getImageUrl(entity.attributes?.cover?.data),
	}));

	return {
		title: section.title ?? 'The collection of our points of view',
		logo: section.logo?.data?.attributes?.url,
		featured: featured.at(0),
		items,
	};
});

const partnerSection = computed(() => {
	const section = page.value?.attributes?.partnerSection;
	if (!section?.active) return undefined;

	const items = [section.partner_first, section.partner_second];
	const [left, right] = items.map((column) => {
		if (!column) return undefined;

		const contents = column.content_list?.data?.attributes?.contents;
		const list = (contents?.data ?? []).filter(isValidEntity).map((e) => ({
			title: e.attributes.title ?? '',
			category: getCategoryInfo(e.attributes.category?.data).name,
			url: getContentUrl(e),
			image: getImageUrl(e.attributes.cover?.data),
			imageSize: 'medium' as const,
		}));

		return {
			title: column.title ?? '',
			logo: column.partner?.data?.attributes?.logo?.data?.attributes?.url,
			list,
			viewMoreUrl: '#',
		};
	});
	return { left, right };
});

const newsSliderArgs = computed(() => {
	const newsSlider = page.value?.attributes?.newsSlider;
	if (!newsSlider?.active) return undefined;

	const tag = newsSlider?.content_list?.data;
	const maybeContents = tag?.attributes?.contents?.data;
	const contents = (maybeContents ?? []).filter(isValidEntity);

	return {
		title: newsSlider?.title ?? '',
		list: contents.map((content) => ({
			id: content.id,
			image: getImageUrl(content.attributes.cover?.data),
			category: getCategoryInfo(content.attributes.category?.data).name,
			title: content.attributes.title,
			description: content.attributes.short_description ?? '',
			date: '',
			url: getContentUrl(content),
		})),
		sliderBreakpoints: {
			0: { slidesPerView: 1.2 },
			576: { slidesPerView: 1.8 },
			768: { slidesPerView: 2.8 },
			992: { slidesPerView: 3.2 },
			1200: { slidesPerView: 3 },
		},
	};
});

const heroItems = computed(() => {
	const hero = page.value?.attributes?.hero;
	if (!hero) return undefined;

	const items = hero.tag?.data?.attributes?.contents;
	const blocks = (items?.data ?? []).slice(0, 3).filter(isValidEntity);
	const result = blocks.map((item) => ({
		image: getImageUrl(item.attributes.cover?.data),
		category: getCategoryInfo(item.attributes.category?.data).name,
		title: item.attributes.title ?? '',
		date: dateFormat(item.attributes.publishedAt),
		url: getContentUrl(item),
	}));
	const first = result.at(0);
	const second = result.at(1);
	const third = result.at(2);
	return { first, second, third };
});

const mostRead = computed(() => {
	const items = (data.value?.mostRead?.data ?? []).filter(isValidEntity);
	return items.map((item) => ({
		id: item.id,
		title: item.attributes.title,
		category: getCategoryInfo(item.attributes.category?.data).name,
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
