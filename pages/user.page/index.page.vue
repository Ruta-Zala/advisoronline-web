<template>
	<ProfileLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('user-profile.header')"
		:sub-header="t('user-profile.subheader')"
	>
		<div class="flex w-full flex-col justify-between md:flex-row">
			<div class="flex">
				<div
					class="flex h-[124px] w-[124px] items-center justify-center rounded-full bg-red-100 text-[32px] font-bold text-white-100"
				>
					{{ userDetails.shortName }}
				</div>
				<div class="ml-8 flex flex-col justify-center gap-2 text-dark-100">
					<p class="text-sm font-semibold text-red-100">
						{{ userDetails.post }}
					</p>
					<p class="text-[26px] font-normal">{{ userDetails.name }}</p>
					<p class="text-sm font-semibold">{{ userDetails.email }}</p>
				</div>
			</div>
			<div
				class="flex items-center justify-center gap-6 text-xs font-semibold md:justify-end"
			>
				<button class="uppercase text-dark-100">
					{{ t('user-profile.add-image') }}
				</button>

				<a
					href="/user/edit-profile"
					class="bg-dark-100 px-6 py-3 uppercase text-white-100"
				>
					{{ t('user-profile.edit') }}
				</a>
			</div>
		</div>
		<div class="py-8">
			<BlockHeader
				:title="t('shared.active-subscription')"
				:hide-underline="false"
				class="my-4"
			/>
			<Subscribe v-bind="subscribeArgs" />
		</div>

		<BlockHeader
			class="my-4"
			:title="t('user-profile.read-articles')"
			:hide-underline="false"
			:left-icon="IconBook"
		>
			<template #append>
				<button class="flex items-center gap-3" @click="() => {}">
					<span class="text-xs font-semibold uppercase">
						{{ t('user.clear-recent') }}
					</span>
					<IconDelete class="h-6 w-6" />
				</button>
			</template>
		</BlockHeader>

		<div>
			<CardTwo
				v-for="(item, index) in recentNews"
				:key="index"
				:title="item.title"
				:category="item.category"
				:url="item.url"
				:date="item.date"
				class="border-b border-grey-100 pb-4 last:border-0 md:pb-2"
			/>
		</div>

		<a href="#" class="mt-8 block text-right text-xs font-semibold uppercase">
			{{ t('user-profile.view-recent') }}
		</a>

		<BlockHeader
			class="my-4"
			:title="t('user-profile.bookmarked-articles')"
			:hide-underline="false"
			:left-icon="IconBookmark"
		/>
		<div>
			<CardTwo
				v-for="(item, index) in recentBookmarkedArticles"
				:key="index"
				:image="item.image"
				:description="item.description"
				:title="item.title"
				:category="item.category"
				:url="item.url"
				bookmarked
				class="border-b border-grey-100 pb-4 last:border-0 md:pb-2"
			/>
		</div>
		<a href="#" class="my-8 block text-right text-xs font-semibold uppercase">
			{{ t('user-profile.view-bookmark') }}
		</a>
	</ProfileLayout>
</template>

<script lang="ts" setup>
import ProfileLayout from '~/layouts-extended/profile.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import Subscribe from '~/components/subscribe/subscribe.component.vue';
import IconBook from '~/components/subscribe-newsletter/components/icon-book-open.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import { IconBookmark, IconDelete } from '~/icons';

definePageMeta({ layout: false });

const { t } = useI18n();
const { $globalSettings } = useNuxtApp();
const { user } = $globalSettings;

const breadcrumbsArgs = {
	list: [{ name: t('shared.account'), url: '#' }],
	current: t('user-profile.my-profile'),
};

const initials = computed(() =>
	user.value?.name
		.split(' ')
		.map((w) => w.at(0)?.toUpperCase())
		.join(''),
);

const userDetails = computed(() => ({
	shortName: initials.value,
	post: 'Invester',
	name: user.value?.name,
	email: user.value?.email,
}));

const subscribeArgs = {
	title: t('shared.no-subscription'),
	description: t('subscribe.description'),
	price: 18,
	link: '#',
};

const recentNews = Array.from({ length: 3 }, () => ({
	title: 'Consultinvest, in 2021 profits and masses in decisive growth',
	imageSize: 'small',
	category: 'Asset Manager',
	date: '22/04/2022',
	url: '#',
}));

const recentBookmarkedArticles = Array.from({ length: 3 }, () => ({
	image: getFakeImage(),
	title: 'Consultinvest, in 2021 profits and masses in decisive growth',
	description:
		'Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di Le ambizioni degli investitori includono sempre più ',
	imageSize: 'small',
	category: 'Asset Manager',
	url: '#',
}));
</script>
