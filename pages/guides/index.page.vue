<template>
	<div>
		<div class="row">
			<div class="lg:col-9">
				<h1 class="mb-2 font-serif text-[34px]">
					<b class="font-semibold text-red-100">
						{{ t('guides.header.head') }}
					</b>
					{{ t('guides.header.head') }}
				</h1>
				<p class="text-base">
					{{ t('guides.subtitle') }}
				</p>
				<BlockHeader :title="t('guides')" class="mt-8" />
				<div class="grid w-full gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
					<CardThree
						v-for="(guide, index) in guides"
						v-bind="guide"
						:key="index"
					/>
				</div>
				<div class="flex justify-center py-12">
					<Pagination :model-value="page - 1" :pages="pages" />
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

				<CardGuidebooks button-size="big" />

				<CardSocials />
				<SubscribeNewsletterSidebar
					v-if="!userInfo?.newsletterEnabled"
					:title="t('subscribe-newsletter.title')"
					:subtitle="t('subscribe-newsletter-sidebar.subtitle')"
					:subscribe-link="getSubscribeLink(userInfo)"
				/>
				<div>
					<BlockHeader :title="t('guidebooks.most-read')" />

					<div class="space-y-2">
						<a
							v-for="(guide, index) in mostReadgGuides"
							:key="index"
							:href="guide.url"
							:class="{
								'border-b border-grey-100':
									index !== mostReadgGuides.length - 1,
							}"
							class="flex items-start gap-4 py-2 md:flex-row"
						>
							<div class="w-full">
								<h1
									class="my-2 font-serif text-[18px] leading-6 tracking-wider"
								>
									{{ guide.title }}
								</h1>
							</div>
						</a>
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

		<div class="container-cancel relative mb-8 h-[300px]">
			<img
				:src="getFakeImage()"
				class="absolute left-0 top-0 h-full w-full object-cover"
				:alt="getFakeImage()"
			/>
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>
		<div class="container-cancel">
			<SectionThree v-slot="slide" v-bind="sectionThreeArgs">
				<CardVideoSeries v-bind="slide" />
			</SectionThree>
			<NewsMagazine />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardThree from '~/components/card-three/card-three.component.vue';
import Pagination from '~/components/pagination/pagination.component.vue';
import CardGuidebooks from '~/components/card-guidebooks/card-guidebooks.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import CardVideoSeries from '~/components/card-video-series/card-video-series.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';

const { t } = useI18n();
const userInfo = useUserInfo();

const guides = Array.from({ length: 13 }, () => ({
	image: getFakeImage(),
	title: faker.lorem.words(5),
	description: faker.lorem.words(10),
	url: '#',
}));

const mostReadgGuides = Array.from({ length: 3 }, () => ({
	title: faker.lorem.words(3),
	url: '#',
}));

const page = 1;
const pages = faker.datatype.number({ min: 1, max: 10 });

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
</script>
