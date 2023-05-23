<template>
	<div>
		<div class="mb-6">
			<GetSwiper v-slot="{ swiper, onSwiper }">
				<div class="mb-8 flex items-center justify-between">
					<h1 class="flex items-center text-xs font-semibold text-red-100">
						<IconOfficeBuilding class="h-6 w-6" /> {{ partnerListArgs.title }}
					</h1>
					<div>
						<button class="h-6 w-6 text-grey-100" @click="swiper?.slidePrev()">
							<IconChevronLeft class="m-auto h-4 w-4" />
						</button>
						<button class="h-6 w-6 text-grey-100" @click="swiper?.slideNext()">
							<IconChevronRight class="m-auto h-4 w-4" />
						</button>
					</div>
				</div>
				<Swiper
					:space-between="20"
					:breakpoints="partnerListArgs.sliderBreakpoints"
					class="container-cancel"
					@swiper="onSwiper"
				>
					<SwiperSlide
						v-for="(slide, index) in partnerListArgs.list"
						:key="index"
						class="my-auto"
					>
						<NuxtLink :to="slide.url" class="flex justify-center">
							<img
								:src="slide.icon"
								class="h-10 max-w-[175px]"
								:alt="slide.icon"
							/>
						</NuxtLink>
					</SwiperSlide>
				</Swiper>
			</GetSwiper>
		</div>
		<div class="container-cancel">
			<hr class="relative mt-4 h-0.5 w-full bg-red-100" />
		</div>
		<div class="row mb-11 mt-14">
			<div class="lg:col-9">
				<Breadcrumbs v-bind="breadcrumbsArgs" class="-ml-2" />

				<i18n-t
					keypath="partner-details.header.head"
					tag="h1"
					class="mb-6 py-6 font-serif text-[34px]"
				>
					<span class="font-semibold text-dark-100">
						{{ t('partner-details.header.tail') }}</span
					>
				</i18n-t>

				<div class="space-y-2 divide-y divide-grey-100">
					<CardOne
						v-for="item in itemsChunks.items8"
						:key="item.id"
						class="py-6"
						:title="item.title || ''"
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
						:title="item.title || ''"
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
		<GetSwiper v-slot="{ swiper, onSwiper }">
			<BlockHeader :title="partnerListArgs.title" class="mb-10">
				<template #append>
					<Controls
						@controls-prev="swiper?.slidePrev()"
						@controls-next="swiper?.slideNext()"
					/>
				</template>
			</BlockHeader>
			<Swiper
				:space-between="20"
				:breakpoints="partnerListArgs.sliderBreakpoints"
				class="container-cancel mb-6"
				@swiper="onSwiper"
			>
				<SwiperSlide
					v-for="(slide, index) in partnerListArgs.list"
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
		<div class="container-cancel relative my-8 h-[300px]">
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
		<ESGFooter
			:section-three-args="sectionThreeArgs"
			:categories="categories"
		/>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/vue';
import {
	IconOfficeBuilding,
	IconChevronRight,
	IconChevronLeft,
} from '~/icons/';
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
import { WatchCallback } from 'vue';
import { EsgPartnersDocument } from './index.query';

const { t } = useI18n();
const userInfo = useUserInfo();
const { query } = useRoute();
const router = useRouter();
const page = ref(parseNumber(query.page, 1) - 1);
const queryPage = computed(() => page.value + 1);

const { data, execute } = await useAsyncQuery(
	EsgPartnersDocument,
	reactive({ page: queryPage, tags: ['esg'] }),
);

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

const partnerListArgs = computed(() => {
	const smb = data.value?.siteManagerPartners;
	const partners = (smb?.data ?? []).filter(isValidEntity);
	return {
		title: 'ESG Partners',
		list: partners.map((partner) => ({
			url: `/esg/partners/${partner.attributes.slug}`,
			icon: partner.attributes.logo?.data?.attributes?.url,
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

const breadcrumbsArgs = {
	list: [{ name: 'ESG', url: '/esg' }],
	current: t('shared.partners'),
};

const itemsChunks = computed(() => {
	const contents = (data.value?.contents?.data ?? []).filter(isValidEntity);
	const items = contents.map((item) => ({
		id: item.id,
		title: item.attributes.title,
		shortDescription: item.attributes.short_description ?? '',
		category: getCategoryInfo(item.attributes.category?.data).name,
		image: getImageUrl(item.attributes.cover?.data),
		url: getContentUrl(item),
	}));

	// Query has pageSize 12
	const [items8, items4] = chunk(items, 8);
	return { items8, items4 };
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

const categories = computed(() => {
	return (data.value?.categories?.data ?? [])
		.filter(isValidEntity)
		.map(({ attributes }) => ({
			image: getFakeImage(),
			name: convertSlugToString(attributes.name),
			url: `/${attributes.slug}`,
		}));
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
</script>
