<template>
	<div>
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
					class="h-full w-full"
				/>
				<CardBlockOne
					v-if="heroItems.third"
					v-bind="heroItems.third"
					size="small"
					class="h-full w-full"
				/>
			</div>
		</div>
		<div class="row mb-10 gap-4 lg:gap-0">
			<div class="w-full lg:col-9">
				<div v-if="columnList" class="row gap-y-10">
					<div class="md:col-6">
						<template v-if="columnList.left">
							<BlockHeader
								:title="columnList.left.title ?? t('shared.financial-advisors')"
								class="mb-5"
							/>
							<CardThree
								v-if="columnList.left.featured"
								:image="columnList.left.featured.image"
								:title="columnList.left.featured.title"
								:category="columnList.left.featured.category"
								:date="columnList.left.featured.date"
								:url="columnList.left.featured.url"
								:underline="false"
								class="pb-8"
							/>
							<div class="space-y-2 divide-y divide-grey-100">
								<CardTwo
									v-for="item in columnList.left.items"
									:key="item.slug"
									:title="item.title ?? ''"
									:url="item.url"
									:category="item.category"
								/>
							</div>
							<a
								v-if="false"
								href="#"
								class="mt-3.5 block text-right text-xs font-semibold"
							>
								{{ t('shared.view-more') }}
							</a>
						</template>
					</div>
					<div class="md:col-6">
						<template v-if="columnList.right">
							<BlockHeader :title="columnList.right.title" class="mb-5" />
							<CardThree
								v-if="columnList.right.featured"
								:image="columnList.right.featured.image"
								:title="columnList.right.featured.title"
								:category="columnList.right.featured.category"
								:date="columnList.right.featured.date"
								:url="columnList.right.featured.url"
								:underline="false"
								class="pb-8"
							/>
							<div class="space-y-2 divide-y divide-grey-100">
								<CardTwo
									v-for="item in columnList.right.items"
									:key="item.slug"
									:title="item.title ?? ''"
									:url="item.url"
									:category="item.category"
								/>
							</div>
							<a
								v-if="false"
								href="#"
								class="mt-3.5 block text-right text-xs font-semibold"
							>
								{{ t('shared.view-more') }}
							</a>
						</template>
					</div>
				</div>
			</div>
			<div class="space-y-4 lg:col-3">
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<img
						:src="getFakeImage()"
						:alt="'image'"
						class="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
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
			<img
				:src="getFakeImage()"
				:alt="'image'"
				class="absolute left-0 top-0 h-full w-full object-cover"
			/>
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>
		<div class="row mb-14">
			<div class="mb-8 space-y-14 lg:col-9">
				<div class="mb-8">
					<BlockHeader :title="t('shared.recent-news')" class="mb-4" />
					<div class="space-y-2 divide-y divide-grey-100">
						<CardTwo
							v-for="item in recentNews"
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
				<div v-if="carouselFeatured" class="mb-8 bg-grey-200 p-2 sm:p-6">
					<GetSwiper v-slot="{ swiper, onSwiper }">
						<BlockHeader
							:title="carouselFeatured.title"
							:logo="carouselFeatured.logo"
							class="mb-4"
							bold
						>
							<template v-if="carouselFeatured.items.length !== 0" #append>
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
				<div>
					<GetSwiper v-slot="{ swiper, onSwiper }">
						<BlockHeader :title="featuredEventsArgs.title" class="mb-4">
							<template #append>
								<Controls
									@controls-prev="swiper?.slidePrev()"
									@controls-next="swiper?.slideNext()"
								/>
							</template>
						</BlockHeader>
						<Swiper :space-between="20" :slides-per-view="1" @swiper="onSwiper">
							<SwiperSlide
								v-for="(slide, index) in featuredEventsArgs.list"
								:key="index"
							>
								<CardEvent v-bind="slide" />
							</SwiperSlide>
						</Swiper>
					</GetSwiper>
				</div>
			</div>
			<div class="space-y-4 lg:col-3">
				<CardGuidebooks button-size="big" />
				<a
					v-if="advisorCta"
					:href="advisorCta"
					class="block bg-red-100 px-4 py-8 text-center font-serif text-lg font-semibold text-white-100 duration-100 hover:bg-red-200"
					>{{ t('home.become-financial-advisor') }}</a
				>
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<img
						:src="getFakeImage()"
						:alt="'image'"
						class="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
					>
						{{ t('shared.ad-space') }}
					</div>
				</div>
				<CardSocials />
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<img
						:src="getFakeImage()"
						:alt="'image'"
						class="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
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
						{{ t('shared.view-more') }}
					</a>
				</div>
			</div>
		</div>
		<div v-if="fullRow" class="mb-14">
			<GetSwiper v-slot="{ swiper, onSwiper }">
				<BlockHeader :title="fullRow.title" class="mb-4">
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</BlockHeader>
				<Swiper
					:space-between="20"
					:breakpoints="fullRow.sliderBreakpoints"
					@swiper="onSwiper"
				>
					<SwiperSlide v-for="(slide, index) in fullRow.list" :key="index">
						<CardThree v-bind="slide" />
					</SwiperSlide>
				</Swiper>
			</GetSwiper>
		</div>
		<div v-if="partnersInFocus" class="mb-9">
			<GetSwiper v-slot="{ swiper, onSwiper }">
				<BlockHeader :title="partnersInFocus.title" class="mb-10">
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</BlockHeader>
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
						<a :href="slide.url" class="flex justify-center">
							<img
								:src="slide.icon"
								:alt="slide.icon"
								class="h-10 max-w-[175px]"
							/>
						</a>
					</SwiperSlide>
				</Swiper>
			</GetSwiper>
		</div>
		<div class="container-cancel">
			<SectionThree v-slot="slide" v-bind="sectionThreeArgs">
				<CardVideoSeries v-bind="slide" />
			</SectionThree>
			<SectionTwo v-slot="slide" v-bind="upcomingEventsArgs">
				<CardEvent v-bind="slide" />
			</SectionTwo>
			<NewsMagazine
				v-if="magazineBox"
				:title="magazineBox.title"
				:subtitle="magazineBox.subtitle"
				:details-link="magazineBox.ctaDetail"
				:demos-link="magazineBox.ctaDemo"
				:image="magazineBox.image"
			/>
		</div>
		<div class="container-cancel relative mb-14 h-[300px]">
			<img
				:src="getFakeImage()"
				:alt="'image'"
				class="absolute left-0 top-0 h-full w-full object-cover"
			/>
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>
		<BlockHeader :title="t('shared.looking-for-categories')" class="mb-4" />
		<Searchbar class="mb-8" />
		<ExploreCategories
			v-if="categories"
			:title="categories.title"
			:categories="categories.categories"
		/>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import ExploreCategories from '~/components/explore-categories/explore-categories.component.vue';
import CardGuidebooks from '~/components/card-guidebooks/card-guidebooks.component.vue';
import Searchbar from '~/components/searchbar/searchbar.component.vue';
import CardBlockOne from '~/components/card-block-one/card-block-one.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import CardEvent from '~/components/card-event/card-event.component.vue';
import CardVideoSeries from '~/components/card-video-series/card-video-series.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardThree from '~/components/card-three/card-three.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import SectionTwo from '~/components/section-two/section-two.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import SliderTwo from '~/components/slider-two/slider-two.component.vue';
import { HomeDocument, HomeQuery } from './index.query';

const { t } = useI18n();
const userInfo = useUserInfo();
const dateFormat = useDateFormatter();

const { data, error } = await useAsyncQuery(HomeDocument, { limit: 3 });

if (error.value) {
	globalThis.console.dir(error.value);
	throw createError({
		statusCode: 500,
		statusMessage: t('error.something-went-wrong'),
	});
}

type Pages = NonNullable<HomeQuery['siteManagerHomePages']>;
const page = computed<Pages['data'][number] | undefined>(() => {
	const maybePages = data.value?.siteManagerHomePages?.data;
	return (maybePages ?? []).at(0);
});

if (!hasRefValue(page)) {
	throw createError({
		statusCode: 404,
		statusMessage: t('shared.error.page-not-created'),
	});
}

const heroItems = computed(() => {
	const hero = page.value?.attributes?.hero;
	if (!hero) return undefined;

	const items = hero?.tag?.data?.attributes?.contents;
	const blocks = (items?.data ?? []).slice(0, 3).filter(isValidEntity);
	const [first, second, third] = blocks.map((item) => ({
		image: getImageUrl(item.attributes.cover?.data),
		category: getCategoryInfo(item.attributes.category?.data).name,
		title: item.attributes.title ?? '',
		date: dateFormat(item.attributes.publishedAt),
		url: getContentUrl(item),
	}));
	return { first, second, third };
});

const columnList = computed(() => {
	const list = page.value?.attributes?.columnList;
	if (!list?.active) return undefined;
	const [left, right] = [list.First, list.Second].map((column) => {
		if (!column) return undefined;

		const contents = column.content_list?.data?.attributes?.contents;
		const validEntities = (contents?.data ?? []).filter(isValidEntity);
		const featuredContents = column.feature_article?.data?.attributes?.contents;
		const featured = (featuredContents?.data ?? [])
			.filter(isValidEntity)
			.map((entity) => ({
				title: entity.attributes.title,
				url: getContentUrl(entity),
				date: dateFormat(entity.attributes.publishedAt),
				category: getCategoryInfo(entity.attributes.category?.data).name,
				image: getImageUrl(entity?.attributes?.cover?.data),
			}));

		return {
			title: column.title ?? t('shared.financial-advisors'),
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

const recentNews = computed(() => {
	const items = (data.value?.recentNews?.data ?? []).filter(isValidEntity);
	return items.map((item) => ({
		slug: item.attributes.slug,
		title: item.attributes.title,
		image: getImageUrl(item.attributes.cover?.data),
		category: getCategoryInfo(item.attributes.category?.data).name,
		shortDescription: item.attributes.short_description ?? '',
		url: getContentUrl(item),
	}));
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

	const fItems = section.featured_content_article?.data?.attributes?.contents;
	const featured = (fItems?.data ?? []).filter(isValidEntity).map((entity) => ({
		title: entity.attributes.title,
		url: getContentUrl(entity),
		date: dateFormat(entity.attributes.publishedAt),
		category: getCategoryInfo(entity.attributes.category?.data).name,
		image: getImageUrl(entity?.attributes?.cover?.data),
	}));

	return {
		title: section.title ?? t('shared.collection-points'),
		logo: section.logo?.data?.attributes?.url,
		items,
		featured: featured.at(0),
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

const advisorCta = computed(() => {
	const section = page.value?.attributes?.becomeAnAdvisorCta;
	if (!section?.active) return undefined;

	return section.cta ?? undefined;
});

const fullRow = computed(() => {
	const section = page.value?.attributes?.armchairsView;
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
		title: section.title ?? t('home.become-arm-chairs-view'),
		list,
		sliderBreakpoints: {
			0: { slidesPerView: 1.2 },
			576: { slidesPerView: 1.8 },
			768: { slidesPerView: 2.8 },
			992: { slidesPerView: 3.2 },
			1200: { slidesPerView: 3.2 },
			1366: { slidesPerView: 4.2 },
		},
	};
});

const partnersInFocus = computed(() => {
	const section = page.value?.attributes?.partnersInFocus;
	if (!section?.active) return undefined;

	return {
		title: section.title ?? t('shared.partners-in-focus'),
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

const magazineBox = computed(() => {
	const section = page.value?.attributes?.magazineBox;
	if (!section?.active) return undefined;

	return {
		title: section.title ?? undefined,
		subtitle: section.subtitle ?? undefined,
		ctaDetail: section.cta_detail ?? '#',
		ctaDemo: section.cta_demo ?? '#',
		image: section.image?.data?.attributes?.url ?? undefined,
	};
});

const categories = computed(() => {
	const section = page.value?.attributes?.categorySelection;
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

const featuredEventsArgs = {
	title: t('home.featured-events'),
	list: Array.from({ length: 5 }, () => ({
		date: '24 April',
		location: 'TBC, Rome',
		startingTime: '09:30',
		endingTime: '13:00',
		title: 'Lo spazio inesplorato',
		description:
			'What are the megatrends destined to grow exponentially in the near future?',
		writer: 'Advisor Writing',
		isSaved: false,
		image: getFakeImage(),
		showFrame: true,
		url: '#',
	})),
};

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

const upcomingEventsArgs = {
	title: t('shared.upcoming-events'),
	link: {
		title: 'EXPLORE EVENTS',
		url: '#',
	},
	list: Array.from({ length: 5 }, () => ({
		id: faker.datatype.uuid(),
		date: '24 April',
		location: 'TBC, Rome',
		startingTime: '09:30',
		endingTime: '13:00',
		title: 'Lo spazio inesplorato',
		description:
			'What are the megatrends destined to grow exponentially in the near future?',
		writer: 'Advisor Writing',
		isSaved: false,
		image: getFakeImage(),
		showFrame: false,
		url: '#',
	})),
};
</script>
