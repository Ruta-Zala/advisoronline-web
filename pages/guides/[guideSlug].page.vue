<template>
	<div>
		<div class="row mb-10 py-10">
			<div class="w-full lg:col-9">
				<div class="text-center">
					<Breadcrumbs v-bind="breadcrumbsArgs" class="mb-8" />
				</div>
				<HeaderArticle v-bind="articleInfo" class="mb-10" />
				<p
					v-if="false"
					class="text-[13px] font-light tracking-wide text-grey-100"
				>
					{{ t('shared.article-tags') }}:
				</p>
				<div v-if="false" class="mb-4 flex flex-wrap gap-2">
					<Tag v-for="tag in articleTags" :key="tag.name" v-bind="tag" />
				</div>
				<img
					src="../../assets/guidebook-group-big.png"
					class="mx-auto mb-8 max-h-[410px] object-cover"
				/>
				<Markup
					class="text-center font-serif text-[21px] font-semibold tracking-wide"
					:html="shortDescription"
				/>
				<hr class="m-auto my-10 w-20 text-red-100" />
				<BlockHeader :title="t('introduction')" class="mb-4" />
				<p class="prose max-w-full leading-7 tracking-wide">
					{{ introduction }}
				</p>
				<BlockHeader :title="t('authors')" class="my-8" />
				<p class="prose max-w-full leading-7 tracking-wide">
					{{ authorsDescription }}
				</p>
				<div class="flex flex-wrap gap-8 py-8">
					<div
						v-for="(author, index) in authors"
						:key="index"
						:class="{ 'gap-2 px-0': !author.image, 'gap-4 px-4': author.image }"
						class="flex items-center gap-4 border-l border-l-grey-100"
					>
						<div>
							<img v-if="author.image" :src="author.image" :alt="author.name" />
						</div>
						<div>
							<h1 class="font-serif text-lg font-normal">{{ author.name }}</h1>
							<p class="text-[13px] font-medium">{{ author.post }}</p>
						</div>
					</div>
				</div>
				<BlockHeader :title="t('partners')" class="mb-4" />
				<PartnerDetails v-bind="partnerDetails" variant="light" />
				<div class="relative my-8 py-10 pb-8">
					<img
						src="/images/book-dark.png"
						:alt="'book dark image'"
						class="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<div
						class="relative mx-10 flex flex-col items-center text-center text-white-100"
					>
						<IconBook class="mb-6 h-20 w-20" />
						<h2 class="font-serif text-[26px] font-bold tracking-wide">
							{{ t('guides.download-guide') }}
						</h2>
						<hr class="my-4 w-20" />
						<i18n-t
							keypath="guides.feature.header.head"
							tag="p"
							class="mb-5 text-[13px] font-semibold leading-7 tracking-wide lg:w-1/2"
						>
							<span class="text-red-100">
								{{ t('guides.feature.header.tail') }}
							</span>
						</i18n-t>
						<ul class="my-4 list-disc text-left text-[13px]">
							<li>{{ t('shared.feature.access-magazines') }}</li>
							<li>{{ t('shared.feature.exclusive-articles') }}</li>
							<li>{{ t('shared.feature.follow-news') }}</li>
							<li>{{ t('shared.feature.receive-notifications') }}</li>
						</ul>
						<a
							href="/auth/login"
							class="block border bg-white-100 px-9 py-4 text-xs font-semibold uppercase tracking-wider text-dark-100"
						>
							{{ t('guides.feature.create-account') }}
						</a>
					</div>
				</div>

				<GetSwiper v-slot="{ swiper, onSwiper }">
					<BlockHeader :title="otherGuides.title" class="mb-12">
						<template #append>
							<Controls
								@controls-prev="swiper?.slidePrev()"
								@controls-next="swiper?.slideNext()"
							/>
						</template>
					</BlockHeader>
					<Swiper
						:space-between="290"
						:breakpoints="otherGuides.sliderBreakpoints"
						@swiper="onSwiper"
					>
						<SwiperSlide
							v-for="(guide, index) in otherGuides.list"
							:key="index"
						>
							<a :href="guide.url">
								<div class="inline-block w-[235px] text-center">
									<div
										class="group relative m-auto mb-5 h-[226px] w-[184px] shadow-[20px_35px_50px_-15px_rgba(0,0,0,0.3),5px_5px_0_rgba(0,0,0,0.08)]"
									>
										<img
											:src="image"
											class="absolute left-0 top-0 h-full w-full object-cover"
										/>
									</div>

									<h2
										class="mb-2 font-serif text-[21px] font-semibold tracking-wide"
									>
										{{ guide.title }}
									</h2>

									<h4 v-if="guide.date" class="text-[13px] font-semibold">
										{{ guide.date }}
									</h4>
								</div></a
							>
						</SwiperSlide>
					</Swiper>
				</GetSwiper>

				<a
					v-if="false"
					href="#"
					class="mt-12 block text-right text-xs font-semibold"
				>
					{{ t('shared.view-more') }}
				</a>
			</div>
			<div class="w-full space-y-4 lg:col-3">
				<CardSocials />
				<CardFollow :liked="true" />
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<img
						:src="getFakeImage()"
						class="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
					>
						{{ t('shared.ad-space') }}
					</div>
				</div>
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<img
						:src="getFakeImage()"
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
				<BlockHeader :title="t('shared.most-read')" class="mb-5" />
				<div class="divide-y divide-grey-100">
					<CardTwo
						:title="'Consultinvest, in 2021 profits and masses in decisive growth'"
						image-size="small"
						category="Asset Manager"
						url="#"
					/>
					<CardTwo
						:title="'Consultinvest, in 2021 profits and masses in decisive growth'"
						image-size="small"
						category="Asset Manager"
						url="#"
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
					class="mt-3.5 block text-right text-xs font-semibold uppercase"
				>
					{{ t('shared.view-all-new') }}
				</a>
			</div>
		</div>

		<div class="container-cancel">
			<div class="relative mb-14 h-[300px] w-full">
				<img
					:src="getFakeImage()"
					class="absolute left-0 top-0 h-full w-full object-cover"
				/>
				<div
					class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
				>
					{{ t('shared.ad-space') }}
				</div>
			</div>
			<SectionThree v-slot="slide" v-bind="sectionThreeArgs">
				<CardVideoFour v-bind="slide" />
			</SectionThree>
			<NewsMagazine />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import IconBook from '~/components/subscribe-newsletter/components/icon-book-open.component.vue';
import HeaderArticle from '~/components/header-article/header-article.component.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import Tag from '~/components/tag/tag.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import generaliInvestmentLogo from '~/assets/partners-logos/pro-generali-investments.svg';
import PartnerDetails from '~/components/partner-details/partner-details.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import CardFollow from '~/components/card-follow/card-follow.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardVideoFour from '~/components/card-video-four/card-video-four.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import Markup from '~/components/markup/markup.component.vue';

const { t } = useI18n();
const userInfo = useUserInfo();

const breadcrumbsArgs = {
	list: [
		{
			name: t('guide'),
			url: '#',
		},
	],
	current: 'Advisor Guidebook 4 - Fixed Income Flessible',
};

const articleTags = [
	{
		name: 'Glossary',
	},
	{
		name: 'Linear',
	},
	{
		name: 'Regression',
	},
];

const articleInfo = {
	title: 'Advisor Guidebook 4 - Fixed Income Flessible',
	date: '05/05/2022',
	readingTime: 1,
};

const image = getFakeImage();
const shortDescription = `Never before in <span class='text-red-100'>the bond market has there been so little remuneration for holding so much risk.</span> But this loss of security hasn't deterred Italian investors from their old passion for bonds.`;
const introduction = faker.lorem.paragraphs(2);
const authorsDescription = faker.lorem.paragraphs(2);

const authors = Array.from({ length: 3 }, () => ({
	image: getFakeImage(63, 63),
	name: faker.name.fullName(),
	post: 'Head of Sales Italy',
}));

const partnerDetails = {
	name: 'Generali Investments',
	image: generaliInvestmentLogo,
	description: `Generali Investments è tra i maggiori attori nell’Asset Management in Europa, con un modello di business fondato sul talento e sulla specializzazione attraverso un’innovativa piattaforma Multi-boutique. Generali Investments condivide il forte impegno del Gruppo attraverso una vasta gamma di approcci ESG seguiti con coscienza e rigore dalle boutique specializzate della sua piattaforma.`,
};

const otherGuides = {
	title: 'Discover other guides',
	list: Array.from({ length: 5 }, () => ({
		id: faker.datatype.uuid(),
		image: getFakeImage(),
		title: 'Fixed Income Short Duration',
		date: '04/04/2022',
		url: '#',
	})),
	sliderBreakpoints: {
		0: {
			slidesPerView: 1.2,
		},
		576: {
			slidesPerView: 1.8,
		},
		768: {
			slidesPerView: 2.8,
		},
		992: {
			slidesPerView: 3.2,
		},
		1200: {
			slidesPerView: 3.2,
		},
		1366: {
			slidesPerView: 4.2,
		},
	},
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
			category: 'Asset Manager',
			title: 'Glasgow: time to take stock of the negotiations',
			thumbnail: getFakeImage(),
		})),
	},
	link: {
		text: t('shared.explore-videos'),
		url: '#',
	},
};
</script>
