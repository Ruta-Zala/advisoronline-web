<template>
	<div>
		<div class="row">
			<div class="lg:col-9">
				<Breadcrumbs v-bind="breadcrumbsArgs" class="-ml-2 mb-10" />
				<PartnerDetails v-if="partnerDetails" v-bind="partnerDetails" />
				<BlockHeader :title="t('shared.news')" class="mt-12" />
				<div class="space-y-2 divide-y divide-grey-100">
					<CardOne
						v-for="item in itemsChunks.items8"
						:key="item.id"
						class="py-6"
						:title="item.title"
						:description="item.shortDescription"
						:url="item.url"
						:category="convertSlugToString(item.category)"
						:image="item.image"
					/>
					<div class="py-6">
						<SubscribeNewsletter
							v-if="!userInfo?.newsletterEnabled"
							:title="t('subscribe-newsletter.title')"
							:subtitle="t('subscribe-newsletter.subtitle')"
							:subscribe-link="getSubscribeLink(userInfo)"
						/>
					</div>
					<CardOne
						v-for="item in itemsChunks.items4"
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
				<SubscribeNewsletterSidebar
					v-if="!userInfo?.newsletterEnabled"
					:title="t('subscribe-newsletter.title')"
					:subtitle="t('subscribe-newsletter-sidebar.subtitle')"
					:subscribe-link="getSubscribeLink(userInfo)"
				/>
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
						{{ t('shared.view-more') }}
					</a>
				</div>
			</div>
		</div>
		<div class="container-cancel relative h-[300px]">
			<img
				:src="getFakeImage()"
				class="absolute left-0 top-0 h-full w-full object-cover"
				:alt="getFakeImage()"
			/>
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>
		<GetSwiper
			v-if="partnersInFocus?.list?.length"
			v-slot="{ swiper, onSwiper }"
		>
			<BlockHeader :title="partnersInFocus.title" class="mb-10 mt-9">
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
				class="container-cancel mb-6"
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
import PartnerDetails from '~/components/partner-details/partner-details.component.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import CardOne from '~/components/card-one/card-one.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import ESGFooter from '~/pages/esg/components/esg-footer.component.vue';
import Pagination from '~/components/pagination/pagination.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import { SpecificPartnerDocument } from '../partners/[partnerSlug].query';
import { SpecificPartnerContentDocument } from './[partnerSlug]-second.query';
import { WatchCallback } from 'vue';

const { t } = useI18n();
const userInfo = useUserInfo();
const route = useRoute();
const { data, error } = await useAsyncQuery(
	SpecificPartnerDocument,
	reactive({ partnerSlug: route.params.partnerSlug }),
);

if (error.value) {
	throw createError(error.value);
}

const partner = computed(() => data.value?.siteManagerPartners?.data.at(0));

if (
	!hasRefValue(partner) ||
	!isValidEntity(partner.value) ||
	!partner.value.attributes.esgEnabled
) {
	throw createError({
		statusCode: 404,
		statusMessage: t('error.partner-not-found'),
	});
}

const tags = computed(() => {
	const entities = partner.value.attributes?.esgTags?.data ?? [];
	if (entities.length === 0) return undefined;
	const esgTags = entities.filter(isValidEntity);
	return esgTags.map((t) => t.attributes.name);
});

if (!hasRefValue(tags)) {
	throw createError({
		statusCode: 404,
		statusMessage: t('error.esg-tag-not-found'),
	});
}

const router = useRouter();
const page = ref(parseNumber(route.query.page, 1) - 1);
const queryPage = computed(() => page.value + 1);

const {
	data: contentData,
	error: contentError,
	execute,
} = await useAsyncQuery(
	SpecificPartnerContentDocument,
	reactive({ tags, page: queryPage }),
);

if (contentError.value) {
	throw createError(contentError.value);
}

const pages = computed(
	() => contentData.value?.contents?.meta.pagination.pageCount ?? 0,
);

const onPageChange: WatchCallback<number, number> = (newPage) => {
	execute();
	router.push({ query: { page: newPage + 1 } });
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(page, onPageChange, { flush: 'post' });

const title = computed(() => partner.value.attributes?.title);

const breadcrumbsArgs = {
	list: [
		{ name: 'ESG', url: '/esg' },
		{ name: t('shared.partners'), url: '/esg/partners' },
	],
	current: title.value ?? '',
};

const partnerDetails = computed(() => ({
	name: partner.value.attributes?.title ?? '',
	image: getImageUrl(partner.value.attributes?.logo?.data),
	description: partner.value?.attributes?.description ?? '',
}));

const itemsChunks = computed(() => {
	const cItems = contentData.value?.contents?.data;
	const items = (cItems ?? []).filter(isValidEntity).map((item) => ({
		id: item.id,
		title: item.attributes.title,
		shortDescription: item.attributes.short_description ?? '',
		category: getCategoryInfo(item.attributes.category?.data).name,
		url: getContentUrl(item),
		image: getImageUrl(item.attributes.cover?.data),
	}));

	// Query has pageSize 12
	const [items8, items4] = chunk(items, 8);
	return { items8, items4 };
});

const partnersInFocus = computed(() => {
	const sm = data.value?.siteManagerEsgs?.data.at(0);
	const section = sm?.attributes?.partnersInFocus;
	if (!section?.active) return undefined;

	return {
		title: section.title ?? 'Partners in focus',
		list: section.partners?.data.filter(isValidEntity).map((b) => ({
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

const magazine = computed(() => {
	const sm = data.value?.siteManagerEsgs?.data.at(0);
	const section = sm?.attributes?.magazine;
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
	const sm = data.value?.siteManagerEsgs?.data.at(0);
	const section = sm?.attributes?.categoryBox;
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
