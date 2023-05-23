<template>
	<div>
		<div class="row">
			<div class="col-12 lg:col-9">
				<div class="-ml-4">
					<Breadcrumbs
						:current="props.breadcrumbs.current"
						:list="props.breadcrumbs.list"
					/>
				</div>
				<h1 class="mb-10 mt-8 font-serif text-4xl font-semibold text-red-200">
					{{ snakeTitle.head }}
					<span class="font-normal text-dark-100">{{ snakeTitle.tail }}</span>
				</h1>

				<p
					v-if="false"
					class="mb-4 text-[13px] font-light tracking-wide text-grey-100"
				>
					{{ t('quick-jump-topic') }}:
				</p>

				<BlockHeader :title="t('shared.news')" />

				<div class="divide-y divide-grey-100 divide-opacity-50">
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
					<Pagination
						v-if="pages > 1"
						:pages="pages"
						:model-value="page"
						@update:model-value="$emit('update:page', $event)"
					/>
				</div>
			</div>

			<div class="col-12 space-y-8 lg:col-3">
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

				<CardSocials />

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
						{{ t('shared.view-all-new') }}
					</a>
				</div>
			</div>
		</div>

		<div class="container-cancel">
			<SectionThree v-slot="slide" v-bind="sectionThreeArgs">
				<CardVideoFour v-bind="slide" />
			</SectionThree>

			<NewsMagazine />

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
		</div>

		<BlockHeader :title="t('shared.looking-for-categories')" class="mb-4" />
		<Searchbar class="mb-8" />
		<ExploreCategories
			:categories="categories"
			:title="t('shared.explore-our-categories')"
		/>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardOne from '~/components/card-one/card-one.component.vue';
import Pagination from '~/components/pagination/pagination.component.vue';
import Searchbar from '~/components/searchbar/searchbar.component.vue';
import ExploreCategories from '~/components/explore-categories/explore-categories.component.vue';
import CardVideoFour from '~/components/card-video-four/card-video-four.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import { makeSnake } from '~/utils/make-snake';

defineEmits<{
	(e: 'update:page', $event: number): void;
}>();

const props = defineProps<{
	title: string;
	breadcrumbs: {
		current: string;
		list: Array<{
			name: string;
			url: string;
		}>;
	};
	pages: number;
	page: number;
	items: Array<{
		id: string;
		title: string;
		shortDescription: string;
		category: string;
		image: string;
		url: string;
	}>;
	categories: Array<{
		image: string;
		name: string;
		url: string;
	}>;
	mostRead: Array<{
		id: string;
		title: string;
		category: string;
		url: string;
	}>;
}>();

const { t } = useI18n();
const userInfo = useUserInfo();

const snakeTitle = computed(() => makeSnake(props.title));

const itemsChunks = computed(() => {
	const [items8, items4] = chunk(props.items, 8);
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
