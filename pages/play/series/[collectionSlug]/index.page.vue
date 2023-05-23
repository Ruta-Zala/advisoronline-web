<template>
	<div>
		<section class="mb-16">
			<Breadcrumbs v-bind="breadcrumbsArgs" class="-ml-2 mb-6" dark />
			<h1 class="font-serif text-[34px] font-semibold">{{ content.name }}</h1>
			<div class="container-cancel mt-11">
				<CardVideoThree
					:url="hero.video.url"
					:provider="hero.video.provider"
					:title="hero.name"
					:thumbnail="hero?.thumbnail"
					:subtitle="t('play.series.episode.recent-video')"
				/>
			</div>
		</section>

		<div class="row">
			<div class="w-full lg:col-9">
				<section class="mb-9">
					<h2
						class="text-center font-serif text-[21px] font-semibold tracking-wide"
					>
						{{ shortDescription }}
					</h2>
					<hr class="m-auto mb-8 mt-10 w-16 text-white-100" />

					<Markup
						v-if="content.description"
						class="leading-7 tracking-wide text-white-100"
						:html="content.description"
					/>
				</section>

				<section class="mb-24 flex flex-col gap-4 bg-dark-200 p-6">
					<TextField
						id="name"
						:icon="IconSearch"
						icon-position="left"
						:placeholder="t('shared.search-video-by')"
						:model-value="play.search"
					/>
					<div class="flex gap-4">
						<SelectField
							id="category"
							v-model="play.category"
							:options="[{ text: t('shared.category'), value: '' }]"
							:placeholder="t('shared.category')"
						></SelectField>
						<SelectField
							id="videoType"
							v-model="play.videoType"
							:options="[{ text: t('shared.video-type'), value: '' }]"
							:placeholder="t('shared.video-type')"
						></SelectField>
						<SelectField
							id="conductor"
							v-model="play.conductor"
							:options="[{ text: t('shared.conductor'), value: '' }]"
							:placeholder="t('shared.conductor')"
						></SelectField>
					</div>
					<div class="flex justify-between">
						<button
							class="flex items-center gap-2 border border-red-100 px-6 py-4 text-xs uppercase leading-[14px] tracking-wider text-red-100 duration-100 hover:bg-red-200 hover:text-white-100"
						>
							<IconAdjustment class="h-6 w-6" />
							{{ t('shared.advanced-filter') }}
						</button>
						<div class="flex gap-4">
							<button
								class="w-36 py-4 text-xs uppercase leading-[14px] tracking-wider text-white-100 duration-100 hover:bg-red-200 hover:text-white-100"
							>
								{{ t('shared.clear') }}
							</button>
							<button
								class="w-36 bg-red-100 py-4 text-xs uppercase leading-[14px] tracking-wider text-white-100 duration-100 hover:bg-red-200"
							>
								{{ t('shared.search') }}
							</button>
						</div>
					</div>
				</section>

				<section
					v-for="(season, seasonIndex) in (content.seasons ?? []).filter(
						Boolean,
					)"
					:key="season.id"
					class="pb-20"
				>
					<h2 class="mb-8 font-serif text-[26px] font-bold">
						{{ t('play.season') }} {{ seasonIndex + 1 }}
					</h2>

					<div class="row">
						<div
							v-for="episode in (season.episodes ?? []).filter(Boolean)"
							:key="episode.id"
							class="col-4"
						>
							<div class="relative mb-10">
								<!-- TODO: Decide if this should be link or video play -->
								<a
									:href="`/play/series/${content.slug}/episode/${episode.id}`"
									class="after:absolute after:inset-0"
								>
									<CardVideoTwo
										:url="episode.video?.url"
										:title="stripHtml(episode.name)"
										variant="dark"
										:video-duration="episode.duration ?? ''"
										:footer-text="episode.releaseDate"
										:thumbnail="getImageUrl(episode.thumbnail?.data)"
									/>
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div class="w-full space-y-6 lg:col-3">
				<Share
					:share-options="{
						body: content.name,
						text: content.name,
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

		<section class="pb-12">
			<h2 class="mb-8 text-center font-serif text-2xl font-semibold">
				{{ t('shared.play.series.episode.explore-series') }}
			</h2>

			<div class="grid grid-cols-4 gap-2">
				<QuickJump
					v-for="i in 8"
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
import { ref } from 'vue';
import { capitalize } from '~/utils/capitalize';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import CardFollow from '~/components/card-follow/card-follow.component.vue';
import CardVideoTwo from '~/components/card-video-two/card-video-two.component.vue';
import CardVideoThree from '~/components/card-video-three/card-video-three.component.vue';
import QuickJump from '~/components/quick-jump/quick-jump.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
import Share from '~/components/share/share.component.vue';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import TextField from '~/components/text-field/text-field.component.vue';
import IconSearch from '~/icons/icon-search.component.vue';
import IconAdjustment from '~/icons/icon-adjustment.component.vue';
import Markup from '~/components/markup/markup.component.vue';
import { CollectionDocument } from './index.query';

definePageMeta({ layout: 'default-dark' });

const { t } = useI18n();
const currentUrl = useCurrentUrl();
const userInfo = useUserInfo();
const { params } = useRoute();
const { data } = await useAsyncQuery(CollectionDocument, {
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

const breadcrumbsArgs = computed(() => ({
	list: [{ name: 'play', url: '/play' }],
	current: content.value.name,
}));

const hero = computed(() => {
	const lastSeason = content.value.seasons?.at(-1);
	const lastEpisode = lastSeason?.episodes?.at(-1);

	if (lastEpisode) {
		return {
			name: lastEpisode?.name,
			thumbnail: getImageUrl(lastEpisode?.thumbnail?.data),
			video: lastEpisode?.video,
		};
	} else {
		return {
			name: content.value.name,
			thumbnail: getImageUrl(content.value.header?.data),
			video: content.value.video,
		};
	}
});

const shortDescription = faker.lorem.paragraph();

const play = ref({
	category: '',
	videoType: '',
	conductor: '',
	search: '',
});
</script>
