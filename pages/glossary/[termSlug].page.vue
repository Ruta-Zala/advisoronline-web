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
				<img :src="image" class="mb-8 max-h-[410px] w-full object-cover" />
				<h2
					class="text-center font-serif text-[21px] font-semibold tracking-wide"
				>
					{{ shortDescription }}
				</h2>
				<hr class="m-auto my-10 w-20 text-red-100" />

				<Markup
					class="prose max-w-full leading-7 tracking-wide"
					:html="description"
				/>

				<UserOffer v-bind="userOfferArgs" />

				<BlockHeader :title="t('shared.recent-news')" class="mb-4" />
				<div class="space-y-4 divide-y divide-grey-100">
					<CardTwo
						v-for="item in recentNews"
						:key="item.id"
						:title="item.title"
						:image="item.image"
						image-size="small"
						:category="item.category"
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
						title="Consultinvest, in 2021 profits and masses in decisive growth"
						image-size="small"
						category="Asset Manager"
						url="#"
					/>
					<CardTwo
						title="Consultinvest, in 2021 profits and masses in decisive growth"
						image-size="small"
						category="Asset Manager"
						url="#"
					/>
					<CardTwo
						title="Consultinvest, in 2021 profits and masses in decisive growth"
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
					{{ t('shared.view-more') }}
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
import { IconLock } from '~/icons';
import HeaderArticle from '~/components/header-article/header-article.component.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import Tag from '~/components/tag/tag.component.vue';
import UserOffer from '~/components/user-offer/user-offer.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import CardFollow from '~/components/card-follow/card-follow.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardVideoFour from '~/components/card-video-four/card-video-four.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import Markup from '~/components/markup/markup.component.vue';

const { t } = useI18n();
const userInfo = useUserInfo();
const articleInfo = {
	title: 'What is Linear regression?',
	date: '05/05/2022',
	readingTime: 1,
};

const shortDescription = faker.lorem.paragraphs(1);
const description = faker.lorem.paragraphs(2);
const image = getFakeImage();

const recentNews = Array.from({ length: 5 }, () => ({
	id: faker.datatype.uuid(),
	image: getFakeImage(),
	title: faker.lorem.words(4),
	category: 'Uncategorized',
	url: '#',
}));

const breadcrumbsArgs = {
	list: [
		{
			name: t('glossary.advisor-glossary'),
			url: '#',
		},
		{
			name: 'L',
			url: '#',
		},
	],
	current: t('glossary.linear-regression'),
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

const userOfferArgs = {
	icon: IconLock,
	title: t('shared.user-offer.title'),
	description: [
		t('shared.user-offer.description.1'),
		`<br /><span class='text-red-100'>${t(
			'shared.user-offer.description.2',
		)}</span>`,
	].join(''),
	offers: [
		t('shared.feature.access-magazines'),
		t('shared.feature.exclusive-articles'),
		t('shared.feature.follow-news'),
		t('shared.feature.receive-notifications'),
	],
	loginText: t('shared.sign-in-login'),
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
