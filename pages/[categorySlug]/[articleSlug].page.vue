<template>
	<div>
		<div class="row mb-10 py-10">
			<div class="w-full lg:col-9">
				<div class="text-center">
					<Breadcrumbs v-bind="breadcrumbsArgs" class="mb-8" />
				</div>
				<HeaderArticle
					:title="title"
					:reading-time="5"
					:date="publishedAt"
					:author="author"
					class="mb-10"
				/>
				<p
					v-if="articleTags.length"
					class="text-[13px] font-light tracking-wide text-grey-100"
				>
					{{ t('shared.article-tags') }}:
				</p>
				<div v-if="articleTags.length" class="mb-4 flex flex-wrap gap-2">
					<Tag v-for="tag in articleTags" :key="tag.name" v-bind="tag" />
				</div>
				<img :src="image" class="mb-8 max-h-[410px] w-full object-cover" />
				<h2
					v-if="shortDescription"
					class="text-center font-serif text-[21px] font-semibold tracking-wide"
				>
					<!-- Hydration text content mismatch in <p> -->
					{{ shortDescription.trim() }}
				</h2>
				<hr class="m-auto my-10 w-20 text-red-100" />

				<Markup
					v-if="description"
					class="prose max-w-full leading-7 tracking-wide"
					:html="description"
				/>

				<CtaLogin dark class="my-20" variant="dark" />
				<BlockHeader :title="t('shared.recent-news')" class="mb-4" />
				<div class="space-y-4 divide-y divide-grey-100">
					<CardTwo
						v-for="item in recentNews"
						:key="item.id"
						:title="item.title"
						:image="item.image"
						image-size="small"
						:category="item.category"
						:author="item.author"
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
				<Share
					:share-options="{
						body: title,
						text: title,
						url: currentUrl,
					}"
				/>
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
				<BlockHeader :title="t('shared.quick-tags')" class="mb-4" />
				<div class="flex flex-wrap gap-2">
					<Tag v-for="tag in quickTags" :key="tag.name" v-bind="tag" icon />
				</div>
				<BlockHeader :title="t('shared.most-read')" class="mb-5" />
				<div class="divide-y divide-grey-100">
					<CardTwo
						v-for="(article, index) in mostRead"
						:key="article.id"
						:title="article.title"
						:category="article.category"
						:author="article.author"
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
		<ExploreCategories :categories="categories" />
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import HeaderArticle from '~/components/header-article/header-article.component.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import Tag from '~/components/tag/tag.component.vue';
import CtaLogin from '~/components/cta-login/cta-login.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import ExploreCategories from '~/components/explore-categories/explore-categories.component.vue';
import Searchbar from '~/components/searchbar/searchbar.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import CardFollow from '~/components/card-follow/card-follow.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import CardVideoFour from '~/components/card-video-four/card-video-four.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import Markup from '~/components/markup/markup.component.vue';
import Share from '~/components/share/share.component.vue';
import { ArticleDocument } from './[articleSlug].query';

const { t } = useI18n();
const currentUrl = useCurrentUrl();
const { params } = useRoute();
const { data, error } = await useAsyncQuery(ArticleDocument, {
	articleSlug: params.articleSlug,
	categorySlug:
		params.categorySlug === 'uncategorized' ? undefined : params.categorySlug,
});

if (error.value) {
	const statusCode = (error.value as any)?.networkError?.statusCode;
	const statusMessage = error.value.message;
	throw createError({ statusCode, message: statusMessage });
}

const content = computed(() => data.value?.contents?.data?.[0]?.attributes);

if (!hasRefValue(content)) {
	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const dateFormat = useDateFormatter();

const title = computed(() => content.value.title);
const shortDescription = computed(() => content.value.short_description);
const description = computed(() => content.value.description);
const author = computed(() => getAuthor(data.value?.contents?.data.at(0)));
const image = computed(() => getImageUrl(content.value.cover?.data));
const publishedAt = computed(() => dateFormat(content.value.publishedAt));
const recentNews = computed(() => {
	const contents = (data.value?.recentNews?.data ?? [])
		.filter(isValidEntity)
		.filter((entity) => entity.attributes.slug !== content.value.slug);

	return contents.map((item) => ({
		id: item.id,
		title: item.attributes.title,
		image: getImageUrl(item.attributes.cover?.data),
		category: getCategoryInfo(item.attributes.category?.data).name,
		shortDescription: item.attributes.short_description,
		author: getAuthor(item),
		url: getContentUrl(item),
	}));
});

const categories = computed(() => {
	const categories = (data.value?.categories?.data ?? []).filter(isValidEntity);
	return categories.map(({ attributes }) => ({
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
		author: getAuthor(item),
		url: getContentUrl(item),
	}));
});

const breadcrumbsArgs = {
	list: [
		{
			name: t('previous'),
			url: '#',
		},
		{
			name: t('topics'),
			url: '#',
		},
	],
	current: t('shared.financial-advisors'),
};

const articleTags = computed(() => {
	const entities = (content.value.tags?.data ?? []).filter(isValidEntity);
	return entities.map((tag) => ({
		name: convertSlugToString(tag.attributes.name),
		url: `/tags/${tag.attributes.name}`,
	}));
});

const quickTags = [
	{
		name: 'Jump to',
		url: '#',
	},

	{
		name: 'Network Numbers',
		url: '#',
	},
	{
		name: 'Carrers and professionals',
		url: '#',
	},
	{
		name: 'Networks',
		url: '#',
	},
	{
		name: 'Associations',
		url: '#',
	},
];

const sectionThreeArgs = {
	category: 'UP & DOWN',
	image: getFakeImage(),
	video: {
		title: 'Effetto "rock" sul Salone del Risparmio',
		url: 'https://www.youtube.com/embed/CS8wbTr1n-c',
		date: '05/05/2022',
		author: 'Paola Priest',
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
