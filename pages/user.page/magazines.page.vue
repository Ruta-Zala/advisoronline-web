<template>
	<ProfileFullLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('magazines.shared.header')"
		:sub-header="t('magazines.subheader')"
	>
		<section class="mt-8">
			<BlockHeader :title="t('magazines.subscribed')" class="mb-6" />
			<Subscribe v-bind="subscribeArgs" class="mb-6" />
		</section>

		<section class="mt-20">
			<BlockHeader :title="t('magazines.magazine-demos')" class="mb-16">
				<template #append>
					<button
						class="flex items-center gap-2 text-xs font-semibold text-red-100 duration-75 hover:text-red-200"
					>
						<span class="uppercase">{{ t('magazines.view-archived') }}</span>
						<IconBookOpenOutline class="h-5 w-5" />
					</button>
				</template>
			</BlockHeader>
			<div
				class="flex flex-wrap justify-center gap-10 md:justify-start lg:justify-between"
			>
				<div v-for="i in 4" :key="i">
					<CardMagazine v-bind="cardMagazineArgs" />
				</div>
			</div>
		</section>
		<section class="mt-20">
			<BlockHeader :title="t('magazines.archived')" class="mb-16" />
			<div>
				<h2 class="font-serif text-[26px] font-bold">{{ '2021' }}</h2>
				<span></span>
				<div
					class="mt-9 flex flex-wrap justify-center gap-10 md:justify-start lg:justify-between"
				>
					<div v-for="i in 4" :key="i">
						<CardMagazine v-bind="cardMagazineArgs" />
					</div>
				</div>
			</div>
			<div class="mt-20">
				<h2 class="font-serif text-[26px] font-bold">{{ '2020' }}</h2>
				<div
					class="mt-9 flex flex-wrap justify-center gap-10 md:justify-start lg:justify-between"
				>
					<div v-for="i in 4" :key="i">
						<CardMagazine v-bind="cardMagazineArgs" />
					</div>
				</div>
			</div>
		</section>
		<section class="my-20 border-t border-grey-100 pt-20">
			<div class="mx-auto flex flex-col items-center gap-6">
				<IconSparkles class="mx-auto h-12 w-12" />
				<h1 class="font-serif text-[26px] font-normal">
					{{ t('shared.stay-informed') }}
				</h1>
				<p class="text-center text-sm">
					{{ t('magazines.description') }}
				</p>
				<button class="bg-red-100 px-6 py-4 text-white-100">
					{{ t('magazines.subscribe-upgrade-plan') }}
				</button>
			</div>
		</section>
	</ProfileFullLayout>
</template>

<script lang="ts" setup>
import { IconSparkles, IconBookOpenOutline } from '~/icons';
import ProfileFullLayout from '~/layouts-extended/profile-full.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import Subscribe from '~/components/subscribe/subscribe.component.vue';
import CardMagazine from '~/components/card-magazine/card-magazine.component.vue';

definePageMeta({
	layout: false,
});

const { t } = useI18n();
const breadcrumbsArgs = {
	list: [
		{
			name: t('shared.account'),
			url: '#',
		},
	],
	current: t('magazines.shared.header'),
};

const subscribeArgs = {
	title: t('shared.no-subscription'),
	description: t('shared.subscription.discover-reasons'),
	price: 18,
	link: '#',
};

const cardMagazineArgs = {
	size: 'medium' as const,
	name: 'Magazine N.22 - Erik Stattin',
	image: getFakeImage(),
	magazineUrl: '#',
	showSubscribe: true,
};
</script>
