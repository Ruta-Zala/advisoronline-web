<template>
	<div>
		<section>
			<h1 class="mb-8 font-serif text-[34px]">
				<span class="font-semibold text-red-100">
					{{ t('play.header.head') }}
				</span>
				{{ t('play.header.tail') }}
			</h1>
			<div class="container-cancel relative">
				<GetSwiper v-slot="{ swiper, onSwiper }">
					<div
						class="pointer-events-none absolute inset-0 z-10 flex items-center justify-between"
					>
						<button
							class="pointer-events-auto ml-1 md:ml-4 lg:ml-6"
							:class="{ 'opacity-30': swiper?.activeIndex === 0 }"
							:disabled="swiper?.activeIndex === 0"
							@click="swiper?.slidePrev()"
						>
							<IconChevronLeft class="h-16 w-16" />
						</button>
						<button
							class="pointer-events-auto mr-1 md:mr-4 lg:mr-6"
							:class="{ 'opacity-30': swiper?.activeIndex === 4 }"
							@click="swiper?.slideNext()"
						>
							<IconChevronRight class="h-16 w-16" />
						</button>
						<div
							class="pointer-events-auto absolute bottom-10 right-1/2 inline-flex translate-x-1/2"
						>
							<button
								v-for="i in 5"
								:key="i"
								class="p-1.5"
								@click="swiper?.slideTo(i - 1)"
							>
								<div
									class="h-2 w-2 rounded-full border border-white-100"
									:class="{ 'bg-white-100': swiper?.activeIndex === i - 1 }"
								/>
							</button>
						</div>
					</div>
					<Swiper @swiper="onSwiper">
						<SwiperSlide v-for="i in 5" :key="i">
							<VideoHeader
								:url="'https://www.youtube.com/embed/CS8wbTr1n-c'"
								provider="youtube"
								:title="'Everyone wants sustainability. Not all of them are sustainable'"
								:date="'05/05/2022'"
								:tag="'UP & DOWN'"
								:thumbnail="getFakeImage()"
							/>
						</SwiperSlide>
					</Swiper>
				</GetSwiper>
			</div>
		</section>

		<section class="mb-11 pt-20">
			<GetSwiper v-slot="{ swiper, onSwiper }">
				<BlockHeader
					:title="t('play.latest-videos')"
					class="mb-3.5"
					hide-underline
				>
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</BlockHeader>

				<p class="mb-8 text-grey-100">{{ t('play.new-releases') }}</p>

				<Swiper
					:breakpoints="latestVideosSliderBreakpoints"
					:space-between="20"
					@swiper="onSwiper"
				>
					<SwiperSlide v-for="i in 5" :key="i">
						<CardVideoTwo
							url="https://www.youtube.com/embed/CS8wbTr1n-c"
							category="Deep Green"
							video-duration="20 min"
							:title="'Skills in data management, technology and advanced mathematics” but also the ability to interact'"
							footer-text="Marcella Persola"
							variant="dark"
						/>
					</SwiperSlide>
				</Swiper>
			</GetSwiper>

			<div class="pb-16 pt-14 text-right">
				<a
					v-if="false"
					href="/"
					class="inline-flex items-center gap-2 text-xs font-semibold"
				>
					<span>{{ t('shared.view-more') }}</span>
					<IconPlay class="h-5 w-5" />
				</a>
			</div>

			<hr class="text-grey-100" />
		</section>

		<section class="mb-11">
			<GetSwiper v-slot="{ swiper, onSwiper }">
				<BlockHeader
					:title="t('play.most-viewed')"
					class="mb-3.5"
					hide-underline
				>
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</BlockHeader>

				<p class="mb-8 text-grey-100">{{ t('play.new-releases') }}</p>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<CardVideoOne
							:url="'https://www.youtube.com/embed/CS8wbTr1n-c'"
							:video-duration="'20 min'"
							:title="'“Mettiamo al lavoro” i soldi dei clienti'"
							:description="`Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori`"
						/>
					</div>
					<div>
						<Swiper
							:breakpoints="mostViewedSliderBreakpoints"
							:space-between="16"
							@swiper="onSwiper"
						>
							<SwiperSlide v-for="i in 5" :key="i">
								<CardVideoTwo
									url="https://www.youtube.com/embed/CS8wbTr1n-c"
									category="Deep Green"
									video-duration="20 min"
									:title="'Skills in data management, technology and advanced mathematics” but also the ability to interact'"
									footer-text="Marcella Persola"
									variant="dark"
								/>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</GetSwiper>

			<div class="pb-16 pt-14 text-right">
				<a
					v-if="false"
					href="/"
					class="inline-flex items-center gap-2 text-xs font-semibold"
				>
					<span>{{ t('shared.view-more') }}</span>
					<IconPlay class="h-5 w-5" />
				</a>
			</div>

			<hr class="text-grey-100" />
		</section>

		<section>
			<h2 class="mb-2 text-center font-serif text-[26px] font-bold">
				{{ t('play.section.partners-series') }}
			</h2>
			<p class="mb-8 text-center text-grey-100">
				{{ t('play.section.video-interviews') }}
			</p>

			<div class="row">
				<div v-for="i in 5" :key="i" class="col md:col-6 lg:col-4">
					<div class="mb-10">
						<CardSeries
							url="/"
							:title="faker.lorem.sentence()"
							:description="faker.lorem.paragraph()"
							:image="getFakeImage(200, 50)"
							variant="dark"
							:count="13"
						/>
					</div>
				</div>
			</div>
		</section>

		<div class="container-cancel relative h-[300px] lg:h-[338px]">
			<div
				class="absolute inset-0 flex items-center justify-center bg-grey-200 text-dark-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>

		<section class="flex flex-col items-center pb-10 pt-20 text-center">
			<h2
				class="mb-6 max-w-2xl font-serif text-[34px] font-semibold leading-10"
			>
				{{ t('shared.play.series.episode.section.title') }}
			</h2>
			<p class="mb-6 max-w-2xl tracking-wider">
				{{ t('shared.play.series.episode.section.subtitle') }}
			</p>
			<button
				class="mb-11 bg-red-100 px-8 py-4 text-xs font-semibold uppercase tracking-wider"
			>
				{{ t('shared.play.series.episode.section.button') }}
			</button>
			<hr class="inline-block w-1/12" />
		</section>

		<section>
			<h2 class="mb-8 text-center font-serif text-2xl font-semibold">
				{{ t('shared.play.series.episode.explore-series') }}
			</h2>

			<div
				class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			>
				<QuickJump
					v-for="collection in playCollections"
					:key="collection.id"
					:title="collection.title"
					:description="collection.description"
					:image="collection.image"
					:url="collection.url"
				/>
			</div>
		</section>

		<hr class="my-11 text-grey-100" />

		<section>
			<BlockHeader
				:title="t('shared.advisor-videos')"
				hide-underline
				class="mb-5"
			/>

			<div class="row">
				<div v-for="i in 12" :key="i" class="col-12 sm:col-6 md:col-4 lg:col-3">
					<div class="mb-10">
						<CardVideoTwo
							url="https://www.youtube.com/embed/CS8wbTr1n-c"
							category="Deep Green"
							video-duration="20 min"
							:title="'Skills in data management, technology and advanced mathematics” but also the ability to interact'"
							footer-text="Marcella Persola"
							variant="dark"
						/>
					</div>
				</div>
			</div>

			<div class="py-16 text-right">
				<a
					href="/"
					class="inline-flex items-center gap-2 text-xs font-semibold"
				>
					<span>{{ t('play.section.view-all-videos') }}</span>
					<IconPlay class="h-5 w-5" />
				</a>
			</div>
		</section>

		<div class="container-cancel relative h-[300px] lg:h-[338px]">
			<div
				class="absolute inset-0 flex items-center justify-center bg-grey-200 text-dark-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>

		<div class="container-cancel -mb-3 md:-mb-6 lg:-mb-10">
			<SubscribeNewsletter
				v-if="!userInfo?.newsletterEnabled"
				:title="t('subscribe-newsletter.title')"
				:subtitle="t('subscribe-newsletter.subtitle')"
				:subscribe-link="getSubscribeLink(userInfo)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/vue';
import VideoHeader from '~/components/video-header/video-header.component.vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import { IconChevronLeft, IconChevronRight, IconPlay } from '~/icons';
import CardVideoOne from '~/components/card-video-one/card-video-one.component.vue';
import QuickJump from '~/components/quick-jump/quick-jump.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardVideoTwo from '~/components/card-video-two/card-video-two.component.vue';
import CardSeries from '~/components/card-series/card-series.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import { PartnerCollectionsDocument } from './index.query';

definePageMeta({ layout: 'default-dark' });

const { t } = useI18n();
const userInfo = useUserInfo();
const { data } = await useAsyncQuery(PartnerCollectionsDocument);

const playCollections = computed(() =>
	(data.value?.playCollections?.data ?? []).map((item) => ({
		id: item.id ?? '',
		title: item.attributes?.name ?? '',
		description: stripHtml(item.attributes?.description || ''),
		image: item.attributes?.header?.data?.attributes?.url ?? '',
		url: `/play/series/${item.attributes?.slug}`,
	})),
);

const latestVideosSliderBreakpoints = {
	0: {
		slidesPerView: 1,
	},
	768: {
		slidesPerView: 2,
	},
	1200: {
		slidesPerView: 3,
	},
};

const mostViewedSliderBreakpoints = {
	0: {
		slidesPerView: 1,
	},
	1200: {
		slidesPerView: 2,
	},
};
</script>
