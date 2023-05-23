<template>
	<div>
		<div class="mb-11">
			<h1 class="mb-3 font-serif text-[34px]">
				<span class="pr-2 font-semibold">
					{{ t('play.search.header.head') }}:
				</span>
				{{ t('play.search.header.tail') }}
			</h1>
			<div class="mb-3">
				<span class="pr-2 font-bold">{{ t('shared.search.result') }}:</span>
				<span>{{ '1- 32' }} {{ t('play.search.of') }} {{ '200' }}</span>
			</div>
		</div>

		<section
			class="container-cancel mb-12 flex flex-col gap-4 bg-dark-200 p-10"
		>
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
					class="flex items-center gap-2 border border-red-100 px-6 py-4 text-xs uppercase tracking-wider text-red-100 duration-100 hover:bg-red-200 hover:text-white-100"
				>
					<IconAdjustment class="h-6 w-6" />
					{{ t('shared.advanced-filter') }}
				</button>
				<div class="flex gap-4">
					<button
						class="w-36 py-4 text-xs uppercase tracking-wider text-white-100 duration-100 hover:bg-red-200 hover:text-white-100"
					>
						{{ t('shared.clear') }}
					</button>
					<button
						class="w-36 bg-red-100 py-4 text-xs uppercase tracking-wider text-white-100 duration-100 hover:bg-red-200"
					>
						{{ t('shared.search') }}
					</button>
				</div>
			</div>
		</section>

		<section>
			<h2 class="mb-8 font-serif text-[26px] font-bold">
				{{ t('shared.videos') }}
			</h2>

			<div class="row -mx-2">
				<div v-for="i in 12" :key="i" class="col-4 px-2">
					<div class="mb-10">
						<CardVideoTwo
							url="https://www.youtube.com/embed/CS8wbTr1n-c"
							:title="faker.lorem.sentence()"
							variant="dark"
							video-duration="20 min"
							footer-text="November 15, 2021"
						/>
					</div>
				</div>
			</div>
			<div class="flex justify-center pb-24 pt-12">
				<Pagination :model-value="0" :pages="12" />
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
import { ref } from 'vue';
import QuickJump from '~/components/quick-jump/quick-jump.component.vue';
import CardVideoTwo from '~/components/card-video-two/card-video-two.component.vue';
import { capitalize } from '~/utils/capitalize';
import SubscribeNewsletter from '~/components/subscribe-newsletter/subscribe-newsletter.component.vue';
import IconSearch from '~/icons/icon-search.component.vue';
import IconAdjustment from '~/icons/icon-adjustment.component.vue';
import TextField from '~/components/text-field/text-field.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
import Pagination from '~/components/pagination/pagination.component.vue';

definePageMeta({ layout: 'default-dark' });

const { t } = useI18n();
const userInfo = useUserInfo();

const play = ref({
	category: '',
	videoType: '',
	conductor: '',
	search: '',
});
</script>
