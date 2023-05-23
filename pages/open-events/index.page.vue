<template>
	<div>
		<section class="relative hidden lg:block">
			<div
				class="absolute -top-44 flex w-full items-center text-white-100 lg:w-3/4"
			>
				<IconCalendar class="mr-6 h-14 w-14" />
				<h1 class="border-l pl-6 font-serif text-[34px] font-semibold">
					{{ t('open-events.header') }}
				</h1>
			</div>
		</section>

		<section
			class="container-cancel relative -mt-3 mb-16 overflow-hidden border-[10px] border-b-[34px] border-blue-100 text-white-100 md:-mt-6 lg:-mt-10"
		>
			<div class="relative">
				<button
					class="absolute left-1/2 top-0 z-[2] flex h-14 w-14 -translate-x-1/2 items-center justify-center bg-blue-100 duration-150 hover:text-red-100"
				>
					<IconBookmark class="h-4 w-4 stroke-white-100" />
				</button>
				<GetSwiper v-slot="{ swiper, onSwiper }">
					<div
						class="pointer-events-none absolute inset-0 z-[2] flex items-center justify-between"
					>
						<button
							class="pointer-events-auto ml-1 md:ml-4 lg:ml-6"
							:class="{ 'opacity-30': swiper?.activeIndex === 0 }"
							:disabled="swiper?.activeIndex === 0"
							@click="swiper?.slidePrev()"
						>
							<IconChevronLeft class="h-4 w-4 lg:h-16 lg:w-16" />
						</button>
						<button
							class="pointer-events-auto mr-1 md:mr-4 lg:mr-6"
							:class="{ 'opacity-30': swiper?.activeIndex === 4 }"
							@click="swiper?.slideNext()"
						>
							<IconChevronRight class="h-4 w-4 lg:h-16 lg:w-16" />
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
								<span
									class="block h-2 w-2 rounded-full border border-white-100"
									:class="{ 'bg-white-100': swiper?.activeIndex === i - 1 }"
								/>
							</button>
						</div>
					</div>
					<Swiper @swiper="onSwiper">
						<SwiperSlide v-for="(slide, index) in args.list" :key="index">
							<div class="relative overflow-hidden text-white-100">
								<img
									:src="slide.image"
									:alt="'slider image'"
									class="absolute h-full w-full object-cover"
								/>
								<div class="relative bg-dark-200/80 p-32 text-center">
									<a
										:href="slide.url"
										class="flex flex-col items-center justify-end"
									>
										<h2 class="font-serif text-3xl font-medium tracking-wide">
											{{ slide.date }}
										</h2>
										<div
											class="mb-2 mt-2 flex items-center justify-center gap-2"
										>
											<IconLocationMarker class="h-5 w-5" />
											<p class="text-sm font-medium tracking-wide">
												{{ slide.location }}
											</p>
										</div>
										<h3 class="text-md font-light tracking-wide">
											{{ slide.startingTime }} - {{ slide.endingTime }}
										</h3>
										<div class="my-5 w-14 border-b border-white-100/80"></div>
										<h2
											class="font-serif text-[26px] font-medium tracking-wide"
										>
											{{ slide.title }}
										</h2>
										<p
											v-if="slide.description"
											class="mt-3 px-3 text-sm font-medium tracking-wider"
										>
											{{ slide.description }}
										</p>
									</a>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</GetSwiper>
			</div>
		</section>

		<section class="row mb-12">
			<div class="space-y-9 lg:col-9">
				<div>
					<BlockHeader :title="t('open-events.event-filter')" class="mb-4">
						<template #append>
							<button
								class="flex items-center gap-2 text-xs font-semibold text-red-100 duration-75 hover:text-red-200"
							>
								<span v-if="calendarHidden">
									{{ t('open-events.show-calendar') }}
								</span>
								<span v-else>
									{{ t('open-events.hide-calendar') }}
								</span>
								<IconCalendar class="h-5 w-5" />
							</button>
						</template>
					</BlockHeader>
					<Calendar />
					<div class="flex flex-col gap-4 md:flex-row">
						<SelectField
							id="location"
							v-model="play.location"
							:options="[{ text: t('open-events.location'), value: '' }]"
							:placeholder="t('open-events.location')"
						></SelectField>
						<SelectField
							id="eventType"
							v-model="play.eventType"
							:options="[{ text: t('open-events.event-type'), value: '' }]"
							:placeholder="t('open-events.event-type')"
						></SelectField>
						<SelectField
							id="company"
							v-model="play.company"
							:options="[{ text: t('open-events.company'), value: '' }]"
							:placeholder="t('open-events.company')"
						></SelectField>
						<SelectField
							id="currentYear"
							v-model="play.currentYear"
							:options="[{ text: t('open-events.current-year'), value: '' }]"
							:placeholder="t('open-events.current-year')"
						></SelectField>
					</div>
					<div class="mt-6 flex justify-end gap-4">
						<button
							class="text-black-100 w-36 py-4 text-xs uppercase leading-[14px] tracking-wider duration-100 hover:bg-red-200 hover:text-white-100"
						>
							{{ t('shared.clear-search') }}
						</button>
						<button
							class="w-36 bg-red-100 py-4 text-xs uppercase leading-[14px] tracking-wider text-white-100 duration-100 hover:bg-red-200"
						>
							{{ t('shared.search') }}
						</button>
					</div>
				</div>
				<div>
					<BlockHeader :title="t('open-events.title')" class="mb-4" />
					<div class="space-y-2 divide-y divide-grey-100">
						<CardOne
							v-for="(item, index) in recentNews"
							:key="index"
							class="py-6"
							:title="item.title"
							:description="item.description"
							:url="item.url"
							:category="convertSlugToString(item.category)"
							:writer="item.writer"
							:image="item.image"
							:event="item.event"
						/>
					</div>
				</div>
				<SubscribeNewsletter
					v-if="!userInfo?.newsletterEnabled"
					class="mt-16"
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
				<div>
					<BlockHeader :title="t('shared.most-read')" class="mb-5" />
					<div class="space-y-2">
						<CardTwo
							:title="'Consultinvest, in 2021 profits and masses in decisive growth'"
							image-size="small"
							category="Asset Manager"
							url="#"
							underline
						/>
						<CardTwo
							:title="'Consultinvest, in 2021 profits and masses in decisive growth'"
							image-size="small"
							category="Asset Manager"
							url="#"
							underline
						/>
						<CardTwo
							:title="'Consultinvest, in 2021 profits and masses in decisive growth'"
							image-size="small"
							category="Asset Manager"
							url="#"
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
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<div
						class="absolute inset-0 flex items-center justify-center bg-grey-200 text-dark-100"
					>
						{{ t('shared.ad-space') }}
					</div>
				</div>
			</div>
		</section>

		<div class="container-cancel relative mb-14 h-[300px]">
			<img
				:src="getFakeImage()"
				:alt="faker.word.noun()"
				class="absolute left-0 top-0 h-full w-full object-cover"
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
import { ref } from 'vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardOne from '~/components/card-one/card-one.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import Calendar from '~/components/calendar/calendar.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
import ESGFooter from '~/pages/esg/components/esg-footer.component.vue';
import {
	IconChevronLeft,
	IconChevronRight,
	IconCalendar,
	IconBookmark,
	IconLocationMarker,
} from '~/icons';
import { HomeDocument } from '../index.query';

const { t } = useI18n();
const userInfo = useUserInfo();
const { data } = await useAsyncQuery(HomeDocument, { limit: 3 });

const categories = computed(() =>
	data.value?.categories?.data.map(({ attributes }: any) => ({
		image: getFakeImage(),
		name: convertSlugToString(attributes.name),
		url: `/${attributes.slug}`,
	})),
);

const recentNews = Array.from({ length: 6 }, () => ({
	title: `Consultinvest, in 2021 profits and masses in decisive growth`,
	description: `Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più`,
	image: getFakeImage(),
	category: 'Asset Manager',
	writer: 'Advisor Writing',
	event: {
		date: '24 April',
		location: 'TBC, Rome',
		startingTime: '09:30',
		endingTime: '13:00',
	},
	url: '#',
}));

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

const play = ref({
	location: '',
	eventType: '',
	company: '',
	currentYear: '',
});

const list = Array.from({ length: 5 }, () => ({
	id: faker.datatype.uuid(),
	date: '24 April',
	location: 'Milan, National Museum of Science and Technology',
	startingTime: '09:30',
	endingTime: '13:00',
	title: 'Lo spazio inesplorato',
	description:
		"The second edition of the event organized by ADVISOR will be an opportunity to start a careful reflection on the dynamics linked to the profound changes taking place in our world, starting from a historical photograph and looking at today's challenges and tomorrow's opportunities.",
	writer: 'Advisor Writing',
	isSaved: false,
	image: getFakeImage(),
	showFrame: false,
	url: '#',
}));

const args = {
	title: t('shared.upcoming-events'),
	list,
	link: {
		title: t('open-events.explore-events'),
		url: '#',
	},
};
const calendarHidden = ref(false);
</script>
