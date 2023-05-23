<template>
	<div>
		<div class="row">
			<div class="lg:col-9">
				<Breadcrumbs v-bind="breadcrumbsArgs" class="-ml-2 mb-10" />
				<h1 class="font-serif text-[34px] font-normal text-dark-100">
					<span class="font-semibold text-red-100">
						{{ t('bookmarked.article.header.head') }}
					</span>
					{{ t('bookmarked.article.header.tail') }}
				</h1>
				<Searchbar class="my-8" :placeholder="t('bookmarked.article.search')" />
				<BlockHeader
					:title="bookmarkedArticles.length + t('bookmarked.article.text')"
					class="mt-12"
				/>
				<div class="space-y-2 divide-y divide-grey-100">
					<CardTwo
						v-for="(item, index) in bookmarkedArticles"
						:key="index"
						:image="item.image"
						:description="item.description"
						:title="item.title"
						image-size="medium"
						:category="item.category"
						:url="item.url"
						bookmarked
						class="pb-4 last:border-0 md:pb-2"
					/>
				</div>
				<div
					class="flex justify-center border-t border-grey-100 border-opacity-50 py-12"
				>
					<Pagination
						:model-value="page - 1"
						:pages="pages"
						@update:model-value="onPageChange($event + 1)"
					/>
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
					subscribe-link="/user"
				/>
				<div>
					<BlockHeader :title="t('shared.most-read')" class="mb-5" />
					<div class="space-y-2">
						<CardTwo
							title="Consultinvest, in 2021 profits and masses in decisive growth"
							image-size="small"
							category="Asset Manager"
							url="#"
							underline
						/>
						<CardTwo
							title="Consultinvest, in 2021 profits and masses in decisive growth"
							image-size="small"
							category="Asset Manager"
							url="#"
							underline
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
						class="my-3.5 block text-right text-xs font-semibold uppercase"
					>
						{{ t('shared.view-all-new') }}
					</a>
				</div>
			</div>
		</div>
		<div class="container-cancel">
			<SectionThree v-slot="slide" v-bind="sectionThreeArgs">
				<CardVideoSeries v-bind="slide" />
			</SectionThree>
			<NewsMagazine />
			<div class="relative mb-14 h-[300px]">
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
		</div>

		<BlockHeader :title="t('shared.looking-for-categories')" class="mb-4" />
		<Searchbar class="mb-8" />
		<ExploreCategories :categories="categories" />
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import Searchbar from '~/components/searchbar/searchbar.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import Pagination from '~/components/pagination/pagination.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import CardVideoSeries from '~/components/card-video-series/card-video-series.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import ExploreCategories from '~/components/explore-categories/explore-categories.component.vue';
import { HomeDocument } from '../index.query';

definePageMeta({ layout: 'default' });

const { t } = useI18n();
const userInfo = useUserInfo();
const { data, execute } = await useAsyncQuery(HomeDocument, { limit: 12 });

const { query } = useRoute();
const router = useRouter();
const page = ref(parseNumber(query.page, 1));
const pages = faker.datatype.number({ min: 1, max: 10 });

function onPageChange(newPage: number) {
	page.value = newPage;
	router.push({ query: { page: newPage } });
	execute();
}

const breadcrumbsArgs = {
	list: [
		{
			name: t('shared.account'),
			url: '#',
		},
	],
	current: t('bookmarked.article'),
};

const bookmarkedArticles = Array.from({ length: 10 }, () => ({
	image: getFakeImage(),
	title: 'Consultinvest, in 2021 profits and masses in decisive growth',
	description:
		'Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più ',
	imageSize: 'small',
	category: 'Asset Manager',
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

const categories = computed(() =>
	(data.value?.categories?.data ?? []).map(({ attributes }: any) => ({
		image: getFakeImage(),
		name: convertSlugToString(attributes.name),
		url: `/${attributes.slug}`,
	})),
);
</script>
