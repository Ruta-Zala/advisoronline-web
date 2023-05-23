<template>
	<div>
		<div class="row">
			<div class="col-12 lg:col-9">
				<i18n-t
					keypath="search.header.head"
					tag="h1"
					class="mb-4 font-serif text-4xl font-semibold text-red-200"
				>
					<span class="font-normal text-dark-100">
						{{ t('shared.search.result') }}
					</span>
				</i18n-t>
				<div class="mb-16">
					<strong class="mr-2 font-semibold"
						>{{ t('shared.search.result') }}:</strong
					>
					<span>{{ resultsInfo }}</span>
				</div>

				<div class="mb-20 flex gap-3">
					<TextField
						v-model="search"
						:label="t('search.for')"
						:icon="IconSearch"
						class="grow"
					/>
					<SelectField v-model="selectedSortBy" :options="sortByOptions" />
					<SelectField
						v-model="selectedContentType"
						:options="contentTypesOptions"
					/>
					<button
						class="bg-red-100 px-6 py-2 text-white-100"
						@click="execute()"
					>
						{{ t('shared.search') }}
					</button>
				</div>

				<BlockHeader :title="t('shared.search.result')" />

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
						v-if="pagination.pages > 1"
						v-model="page"
						:pages="pagination.pages"
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
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardOne from '~/components/card-one/card-one.component.vue';
import Pagination from '~/components/pagination/pagination.component.vue';
import Searchbar from '~/components/searchbar/searchbar.component.vue';
import ExploreCategories from '~/components/explore-categories/explore-categories.component.vue';
import TextField from '~/components/text-field/text-field.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
import { IconSearch } from '~/icons';
import { SearchDocument } from './search.query';
import { WatchCallback } from 'vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const userInfo = useUserInfo();

const page = ref(parseNumber(route.query.page, 1) - 1);
const queryPage = computed(() => page.value + 1);
const search = ref(typeof route.query.q === 'string' ? route.query.q : '');

const selectedContentType = ref('content');
const contentTypesOptions = ref([
	{ text: t('search.all-articles'), value: 'content' },
]);

const selectedSortBy = ref('publishedAt:desc');
const sortByOptions = ref([
	{ text: t('search.most-recent'), value: 'publishedAt:desc' },
]);

const variables = reactive({ page: queryPage, search, sortBy: selectedSortBy });

const { data, error, execute } = useAsyncQuery(SearchDocument, variables);

if (error.value) throw createError(error.value);

const pagination = computed(() => {
	const pagination = data.value?.contents?.meta.pagination;
	return {
		pages: pagination?.pageCount ?? 0,
		total: pagination?.total ?? 0,
	};
});

const resultsInfo = computed(() => {
	const current = page.value * 12 + 1;
	return `${current} - ${current + 11} of ${pagination.value.total}`;
});

watchDebounced(search, () => execute(), { debounce: 500, maxWait: 2000 });

const onPageChange: WatchCallback<number> = (newPage) => {
	execute();
	router.push({ query: { ...route.query, page: newPage + 1 } });
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(page, onPageChange, { flush: 'post' });
watch(search, (q) =>
	router.push({ query: { ...route.query, q: q ? q : undefined } }),
);

const itemsChunks = computed(() => {
	const entities = data.value?.contents?.data ?? [];
	const items = entities.filter(isValidEntity).map((item) => ({
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

const categories = computed(() =>
	(data.value?.categories?.data ?? []).map(({ attributes }: any) => ({
		image: getFakeImage(),
		name: convertSlugToString(attributes.name),
		url: `/${attributes.slug}`,
	})),
);

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
