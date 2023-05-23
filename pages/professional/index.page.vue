<template>
	<Container class="lg:mt-[200px]">
		<section class="mb-24">
			<h1 class="mt-2 font-serif text-[34px]">
				<b class="font-semibold text-red-100">
					{{ title.head }}
				</b>
				{{ title.tail }}
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

		<section v-if="partnersInFocus" class="mb-10">
			<BlockHeader :title="partnersInFocus.title" class="mb-10" />
			<div class="flex flex-wrap gap-6">
				<div
					v-for="(slide, index) in partnersInFocus.list"
					:key="index"
					class="flex h-20 w-48 items-center justify-center"
				>
					<a :href="slide.url">
						<img
							:src="slide.icon"
							:alt="slide.icon"
							class="h-10 max-w-[175px]"
						/>
					</a>
				</div>
			</div>
		</section>

		<section class="row mb-12">
			<div class="space-y-12 lg:col-9">
				<template v-if="managerView">
					<div v-if="managerView.list.length">
						<BlockHeader :title="managerView.title" class="mb-4" />
						<div class="space-y-2 divide-y divide-grey-100">
							<CardTwo
								v-for="item in managerView.list"
								:key="item.id"
								:title="item.title"
								:image="item.image"
								image-size="medium"
								:category="item.category"
								:description="item.description"
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
				<template v-if="featuredFunds">
					<GetSwiper
						v-if="featuredFunds.list.length"
						v-slot="{ swiper, onSwiper }"
					>
						<BlockHeader :title="featuredFunds.title" class="mb-6">
							<template #append>
								<Controls
									@controls-prev="swiper?.slidePrev()"
									@controls-next="swiper?.slideNext()"
								/>
							</template>
						</BlockHeader>
						<Swiper
							:space-between="20"
							:breakpoints="featuredFunds.sliderBreakpoints"
							@swiper="onSwiper"
						>
							<SwiperSlide
								v-for="(slide, index) in featuredFunds.list"
								:key="index"
							>
								<CardThree v-bind="slide" class="mb-4" />
							</SwiperSlide>
						</Swiper>
					</GetSwiper>
				</template>
				<SubscribeNewsletter
					v-if="!userInfo?.newsletterEnabled"
					:title="t('subscribe-newsletter.title')"
					:subtitle="t('subscribe-newsletter.subtitle')"
					:subscribe-link="getSubscribeLink(userInfo)"
				/>
			</div>
			<div class="space-y-8 lg:col-3">
				<SubscribeNewsletterSidebar
					v-if="!userInfo?.newsletterEnabled"
					:title="t('subscribe-newsletter.title')"
					:subtitle="t('subscribe-newsletter-sidebar.subtitle')"
					:subscribe-link="getSubscribeLink(userInfo)"
				/>
				<CardSocials />
				<div v-if="mostRead">
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
			:magazine="magazine"
		/>
	</Container>
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
import Controls from '~/components/controls/controls.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import ESGFooter from '~/pages/esg/components/esg-footer.component.vue';
import Container from '~/components/container/container.component.vue';
import { ProfessionalDocument, ProfessionalQuery } from './index.query';
import { makeSnake } from '~/utils/make-snake';

definePageMeta({ layout: 'professional-index' });

const { t } = useI18n();
const { data, error } = await useAsyncQuery(ProfessionalDocument);

if (error.value) {
	globalThis.console.dir(error.value);
	throw createError({
		statusCode: 500,
		statusMessage: t('error.something-went-wrong'),
	});
}

type Pages = NonNullable<ProfessionalQuery['siteManagerProfessionalHomePages']>;
const page = computed<Pages['data'][number] | undefined>(() => {
	const maybePages = data.value?.siteManagerProfessionalHomePages?.data;
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
		description: item.attributes.short_description ?? '',
	}));
	return { first, second, third };
});

const partnersInFocus = computed(() => {
	const section = page.value?.attributes?.partnersInFocus;
	if (!section?.active) return undefined;

	return {
		title: section.title ?? t('shared.partners-in-focus'),
		list: (section.partners?.data ?? []).filter(isValidEntity).map((b) => ({
			url: `/professional/partners/${b.attributes.slug}`,
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

const managerView = computed(() => {
	const section = page.value?.attributes?.managersView;
	if (!section) return undefined;

	const title = section.title ?? t('professional.managers-view');
	const maybeContents = section.content_list?.data?.attributes?.contents?.data;
	const contents = (maybeContents ?? []).filter(isValidEntity);

	const list = contents.map((item) => ({
		id: item.attributes.slug,
		date: dateFormat(item.attributes.publishedAt),
		title: item.attributes.title || '',
		image: getImageUrl(item.attributes.cover?.data),
		category: getCategoryInfo(item.attributes.category?.data).name,
		description: item.attributes.short_description || '',
		url: getContentUrl(item),
	}));

	return { title, list };
});

const featuredFunds = computed(() => {
	const section = page.value?.attributes?.featuredFunds;
	if (!section) return undefined;

	const title = section.title ?? t('professional.featured-funds');
	const maybeContents = section.feature_article?.data?.attributes?.contents;
	const contents = (maybeContents?.data ?? []).filter(isValidEntity);

	const list = contents.map((item) => ({
		id: item.id || item.attributes?.slug,
		date: dateFormat(item.attributes.publishedAt),
		title: item.attributes?.title || '',
		image: getImageUrl(item.attributes?.cover?.data),
		category: getCategoryInfo(item.attributes?.category?.data).name,
		description: item.attributes?.short_description || '',
		url: getContentUrl(item),
	}));

	return {
		title,
		list,
		sliderBreakpoints: {
			0: { slidesPerView: 1.2 },
			576: { slidesPerView: 1.8 },
			768: { slidesPerView: 2.8 },
			992: { slidesPerView: 3.2 },
			1200: { slidesPerView: 3 },
		},
	};
});

const magazine = computed(() => {
	const section = page.value?.attributes?.magazineBox;
	if (!section?.active) return undefined;

	return {
		title: section.title ?? undefined,
		subtitle: section.subtitle ?? undefined,
		detailsLink: section.cta_detail ?? '#',
		demosLink: section.cta_demo ?? '#',
		image: section.image?.data?.attributes?.url ?? undefined,
	};
});

const categories = computed(() =>
	data.value?.categories?.data.map(({ attributes }: any) => ({
		image: getFakeImage(),
		name: convertSlugToString(attributes.name),
		url: `/${attributes.slug}`,
	})),
);

const mostRead = computed(() => {
	const show = page.value?.attributes?.mostRead ?? true;
	if (!show) return undefined;

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
