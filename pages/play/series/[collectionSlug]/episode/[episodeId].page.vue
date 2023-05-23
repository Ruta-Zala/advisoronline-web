<template>
	<div>
		<div class="row mb-10">
			<div class="w-full lg:col-9">
				<div class="text-center">
					<Breadcrumbs v-bind="breadcrumbsArgs" dark />
				</div>
				<HeaderArticle
					:title="episode.name"
					:date="episode.releaseDate"
					class="mb-8 space-y-6"
				/>
				<p
					v-if="false"
					class="text-[13px] font-light tracking-wide text-grey-100"
				>
					{{ t('shared.article-tags') }}:
				</p>
				<div v-if="false" class="mb-4 flex flex-wrap gap-2">
					<Tag
						v-for="tag in articleTags"
						:key="tag.name"
						v-bind="tag"
						variant="dark"
					/>
				</div>

				<div class="mb-8">
					<CardVideoThree
						v-if="episode.video?.url"
						:url="episode.video?.url"
						:provider="episode.video.provider"
						:title="episode.name"
						:thumbnail="image"
						hide-underline
					/>
					<img v-else :src="image" class="max-h-[410px] w-full object-cover" />
				</div>

				<h2
					class="text-center font-serif text-[21px] font-semibold tracking-wide"
				>
					{{ shortDescription }}
				</h2>
				<hr class="m-auto my-10 w-20 text-white-100" />

				<Markup
					v-if="episode.description"
					class="prose max-w-full leading-7 tracking-wide text-white-100"
					:html="episode.description"
				/>

				<section>
					<BlockHeader
						:title="t('play.series.episode.suggested-videos')"
						hide-underline
						class="mb-5 mt-12"
					/>
					<div class="row">
						<div
							v-for="otherEpisode in otherEpisodes"
							:key="otherEpisode.id"
							class="col-12 sm:col-6 md:col-4 lg:col-4"
						>
							<div class="relative mb-10">
								<a
									:href="`/play/series/${content.slug}/episode/${otherEpisode.id}`"
									class="after:absolute after:inset-0"
								>
									<CardVideoTwo
										:url="otherEpisode.video?.url"
										:video-duration="otherEpisode.duration ?? ''"
										:title="otherEpisode.name"
										:footer-text="otherEpisode.releaseDate"
										variant="dark"
										:thumbnail="
											otherEpisode.thumbnail?.data?.attributes?.url ??
											getFakeImage()
										"
									/>
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div class="w-full space-y-4 lg:col-3">
				<Share
					:share-options="{
						body: episode.name,
						text: episode.name,
						url: currentUrl,
					}"
					dark
				/>
				<CardFollow :liked="true" dark />
				<div
					class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
				>
					<SubscribeNewsletterSidebar
						v-if="!userInfo?.newsletterEnabled"
						:title="t('subscribe-newsletter.title')"
						:subtitle="t('subscribe-newsletter-sidebar.subtitle')"
						:subscribe-link="getSubscribeLink(userInfo)"
						dark
					/>
				</div>
			</div>
		</div>
		<div class="container-cancel relative mb-14 h-[300px]">
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
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
					v-for="i in 12"
					:key="i"
					:title="`${capitalize(faker.word.verb())} & ${capitalize(
						faker.word.noun(),
					)}`"
					:description="faker.lorem.paragraph()"
					:image="getFakeImage(400, 300)"
					url="#"
				/>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import HeaderArticle from '~/components/header-article/header-article.component.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import Tag from '~/components/tag/tag.component.vue';
import CardFollow from '~/components/card-follow/card-follow.component.vue';
import Share from '~/components/share/share.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardVideoTwo from '~/components/card-video-two/card-video-two.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import QuickJump from '~/components/quick-jump/quick-jump.component.vue';
import Markup from '~/components/markup/markup.component.vue';
import CardVideoThree from '~/components/card-video-three/card-video-three.component.vue';
import { capitalize } from '~/utils/capitalize';
import { EpisodeCollectionDocument } from './[episodeId].query';

definePageMeta({ layout: 'default-dark' });

const { t } = useI18n();
const currentUrl = useCurrentUrl();
const userInfo = useUserInfo();
const { params } = useRoute();
const { data } = await useAsyncQuery(EpisodeCollectionDocument, {
	collectionSlug: params.collectionSlug,
});

const content = computed(
	() => data.value?.playCollections?.data.at(0)?.attributes,
);

if (!hasRefValue(content)) {
	throw createError({
		statusCode: 404,
		statusMessage: t('shared.error.page-not-found'),
	});
}

const episode = computed(() =>
	(content.value.seasons ?? [])
		.filter(Boolean)
		.flatMap((s) => s.episodes)
		.filter(Boolean)
		.find((e) => e.id === params.episodeId),
);

if (!hasRefValue(episode)) {
	throw createError({
		statusCode: 404,
		statusMessage: t('shared.error.page-not-found'),
	});
}

const breadcrumbsArgs = computed(() => ({
	list: [
		{ name: 'play', url: '/play' },
		{ name: content.value.name, url: `/play/series/${content.value.slug}` },
	],
	current: episode.value.name,
}));

const articleTags = [
	{
		name: 'News',
	},
	{
		name: 'Carrers and professionals',
	},
	{
		name: 'Network Numbers',
	},
	{
		name: 'Networks',
	},
	{
		name: 'Associations',
	},
];

const image = computed(() => getImageUrl(episode.value.thumbnail?.data));
const shortDescription = faker.lorem.paragraph();

const otherEpisodes = computed(() =>
	(content.value.seasons ?? [])
		.filter(Boolean)
		.flatMap((s) => s.episodes)
		.filter(Boolean)
		.filter((e) => e.id !== params.episodeId),
);
</script>
