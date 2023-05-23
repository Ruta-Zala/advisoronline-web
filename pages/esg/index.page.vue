<template>
	<div>
		<template v-if="partnersInFocus">
			<div v-if="partnersInFocus.list.length" class="mb-9">
				<GetSwiper v-slot="{ swiper, onSwiper }">
					<div class="mb-8 flex items-center justify-between">
						<h1 class="flex items-center text-xs font-semibold text-red-100">
							<IconOfficeBuilding class="h-6 w-6" />
							{{ partnersInFocus.title }}
						</h1>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</div>
					<Swiper
						:space-between="20"
						:breakpoints="partnersInFocus.sliderBreakpoints"
						class="container-cancel"
						@swiper="onSwiper"
					>
						<SwiperSlide
							v-for="(slide, index) in partnersInFocus.list"
							:key="index"
							class="my-auto"
						>
							<a :href="slide.url" class="flex justify-center"
								><img
									:src="slide.icon"
									:alt="slide.icon"
									class="h-10 max-w-[175px]"
							/></a>
						</SwiperSlide>
					</Swiper>
				</GetSwiper>
			</div>
		</template>
		<div class="container-cancel">
			<hr class="relative mt-4 h-0.5 w-full bg-red-100" />
		</div>

		<h1 class="py-8 font-serif text-[34px]">
			<b class="font-semibold text-red-100">{{ title.head }}</b>
			{{ title.tail }}
		</h1>
		<div v-if="heroItems" class="mb-14 flex flex-wrap gap-2 lg:flex-nowrap">
			<div class="w-full lg:w-8/12">
				<CardBlockOne
					v-if="heroItems.first"
					v-bind="heroItems.first"
					size="medium"
				/>
			</div>
			<div class="flex w-full flex-col gap-2 md:flex-row lg:w-4/12 lg:flex-col">
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
		<div class="row mb-14">
			<div class="mb-8 space-y-14 lg:col-9">
				<template v-if="strategiesNews">
					<div v-if="strategiesNews.list.length">
						<BlockHeader :title="strategiesNews.title" class="mb-4" />
						<div class="space-y-2 divide-y divide-grey-100">
							<CardTwo
								v-for="item in strategiesNews.list"
								:key="item.slug"
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
				</template>
			</div>
			<div class="space-y-4 lg:col-3">
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
		</div>
		<div class="container-cancel relative mb-14 h-[300px]">
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>
		<div class="row mb-14">
			<div v-if="productList?.list.length" class="mb-8 space-y-14 lg:col-9">
				<div>
					<GetSwiper v-slot="{ swiper, onSwiper }">
						<BlockHeader :title="productList.title" class="mb-4">
							<template #append>
								<Controls
									@controls-prev="swiper?.slidePrev()"
									@controls-next="swiper?.slideNext()"
								/>
							</template>
						</BlockHeader>
						<Swiper
							:space-between="20"
							:breakpoints="productList.sliderBreakpoints"
							@swiper="onSwiper"
						>
							<SwiperSlide
								v-for="(slide, index) in productList.list"
								:key="index"
							>
								<CardThree v-bind="slide" />
							</SwiperSlide>
						</Swiper>
					</GetSwiper>
				</div>
			</div>
			<div class="space-y-4 lg:col-3">
				<CardSocials />
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
						{{ t('shared.view-more') }}
					</a>
				</div>
			</div>
		</div>
		<template v-if="partnerSection">
			<div v-if="partnerSection.list.length" class="row mb-14">
				<div class="mb-8 space-y-14 lg:col-9">
					<div>
						<SliderTwo v-bind="partnerSection" bold-full />
					</div>
				</div>
			</div>
		</template>
		<ESGFooter
			:section-three-args="sectionThreeArgs"
			:category-title="categories?.title"
			:categories="categories?.categories"
			:magazine="magazine"
		/>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IconOfficeBuilding } from '~/icons/';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import CardBlockOne from '~/components/card-block-one/card-block-one.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardThree from '~/components/card-three/card-three.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import SliderTwo from '~/components/slider-two/slider-two.component.vue';
import ESGFooter from '~/pages/esg/components/esg-footer.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import { EsgHomeDocument, EsgHomeQuery } from './index.query';
import { makeSnake } from '~/utils/make-snake';

const { t } = useI18n();
const { data, error } = await useAsyncQuery(EsgHomeDocument, { limit: 3 });

if (error.value) {
	globalThis.console.dir(error.value);
	throw createError({
		statusCode: 500,
		statusMessage: t('error.something-went-wrong'),
	});
}

type Pages = NonNullable<EsgHomeQuery['siteManagerEsgs']>;
const page = computed<Pages['data'][number] | undefined>(() => {
	const maybePages = data.value?.siteManagerEsgs?.data;
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

const title = computed(() => makeSnake(page.value?.attributes?.title ?? ''));

const partnersInFocus = computed(() => {
	const section = page.value?.attributes?.partnersInFocus;
	if (!section?.active) return undefined;

	return {
		title: section.title ?? t('esg.esg-Partners'),
		list: (section.partners?.data ?? []).filter(isValidEntity).map((b) => ({
			url: `/esg/partners/${b.attributes.slug}`,
			icon: b.attributes.logo?.data?.attributes?.url,
		})),
		sliderBreakpoints: {
			0: { slidesPerView: 1.8 },
			576: { slidesPerView: 2.8 },
			768: { slidesPerView: 3.8 },
			992: { slidesPerView: 4.8 },
			1200: { slidesPerView: 5.8 },
			1366: { slidesPerView: 6.2 },
		},
	};
});

const heroItems = computed(() => {
	const hero = page.value?.attributes?.hero;
	if (!hero) return undefined;

	const items = hero.tag?.data?.attributes?.contents;
	const blocks = (items?.data ?? []).slice(0, 3).filter(isValidEntity);
	const [first, second, third] = blocks.map((item) => ({
		image: getImageUrl(item.attributes.cover?.data),
		category: getCategoryInfo(item.attributes.category?.data).name,
		title: item.attributes.title ?? '',
		date: dateFormat(item.attributes.publishedAt),
		url: getContentUrl(item),
		description: item.attributes.short_description ?? '',
	}));
	return { first, second, third };
});

const strategiesNews = computed(() => {
	const section = page.value?.attributes?.strategiesNews;
	if (!section?.active) return undefined;

	const title = section?.title ?? t('shared.strategies-news');
	const cItems = section?.content_list?.data?.attributes?.contents;

	const list = (cItems?.data ?? [])
		.filter(isValidEntity)
		.slice(0, section?.number_of_items_to_show ?? 6)
		.map((item) => ({
			slug: item.attributes.slug,
			title: item.attributes.title ?? '',
			image: getImageUrl(item.attributes.cover?.data),
			category: getCategoryInfo(item.attributes?.category?.data).name,
			shortDescription: item.attributes.short_description ?? '',
			url: getContentUrl(item),
		}));

	return {
		title: title,
		list: list,
	};
});

const productList = computed(() => {
	const section = page.value?.attributes?.products;
	if (!section?.active) return undefined;

	const contents = section.content_list?.data?.attributes?.contents;
	const list = (contents?.data ?? []).filter(isValidEntity).map((e) => ({
		image: getImageUrl(e.attributes.cover?.data),
		category: getCategoryInfo(e.attributes.category?.data).name,
		title: e.attributes.title ?? '',
		description: e.attributes.short_description ?? '',
		date: dateFormat(e.attributes.publishedAt),
		url: getContentUrl(e),
	}));

	return {
		title: section.title ?? t('esg.esg-products'),
		list,
		sliderBreakpoints: {
			0: { slidesPerView: 1.2 },
			576: { slidesPerView: 1.8 },
			768: { slidesPerView: 2.8 },
			992: { slidesPerView: 3.2 },
			1200: { slidesPerView: 3.2 },
			1366: { slidesPerView: 3 },
		},
	};
});

const partnerSection = computed(() => {
	const section = page.value?.attributes?.focus;
	if (!section) return undefined;

	const partner = section?.partner?.data?.attributes;
	const tagAttributes = section?.content_list?.data?.attributes;
	const contents = (tagAttributes?.contents?.data ?? []).filter(isValidEntity);

	const list = contents.map((item) => ({
		image: getImageUrl(item.attributes?.cover?.data),
		title: item.attributes.title,
		imageSize: 'medium' as const,
		category: getCategoryInfo(item.attributes?.category?.data).name,
		url: getContentUrl(item),
	}));

	return {
		title: section?.title ?? '',
		logo: partner?.logo?.data?.attributes?.url,
		list: list,
		viewMoreUrl: '#',
	};
});

const magazine = computed(() => {
	const section = page.value?.attributes?.magazine;
	if (!section?.active) return undefined;

	return {
		title: section.title ?? undefined,
		subtitle: section.subtitle ?? undefined,
		detailsLink: section.cta_detail ?? '#',
		demosLink: section.cta_demo ?? '#',
		image: section.image?.data?.attributes?.url ?? undefined,
	};
});

const categories = computed(() => {
	const section = page.value?.attributes?.categoryBox;
	if (!section?.active) return undefined;

	const items = (section.categories?.data ?? []).filter(isValidEntity);

	return {
		title: section.title ?? undefined,
		categories: items.map(({ attributes }) => ({
			image: getFakeImage(),
			name: convertSlugToString(attributes.name),
			url: `/${attributes.slug}`,
		})),
	};
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
