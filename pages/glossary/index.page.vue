<template>
	<div>
		<div class="row">
			<div class="lg:col-9">
				<h1 class="mb-2 font-serif text-[34px]">
					<b class="font-semibold text-red-100">
						{{ t('glossary.header.head') }}
					</b>
					{{ t('glossary.header.tail') }}
				</h1>
				<p class="text-base">
					{{ t('glossary.subtitle') }}
				</p>
				<div class="mt-12 space-y-6">
					<Searchbar :show-button="false" />
					<ul class="flex flex-wrap lg:justify-between">
						<li v-for="(alphabet, index) in alphabets" :key="index">
							<button
								:class="{
									'bg-red-100 font-medium text-white-100':
										selectedAlphabet === alphabet,
									'duration-150 hover:text-red-100':
										selectedAlphabet !== alphabet,
								}"
								class="px-3 py-2"
								@click="selectedAlphabet = alphabet"
							>
								{{ alphabet.toUpperCase() }}
							</button>
						</li>
					</ul>
					<div class="border-t-2 border-red-100" />
				</div>
				<div v-for="(glossary, index) in glossaries" :key="index" class="mt-8">
					<BlockHeader :title="glossary.alphabet.toUpperCase()" class="mb-4" />
					<div
						v-for="(link, linkIndex) in glossary.list"
						:key="linkIndex"
						class="py-2"
					>
						<a
							:href="link.url"
							class="border-red-100 py-2 text-base hover:border-b hover:text-red-100"
							>{{ link.title.toUpperCase() }}</a
						>
					</div>
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
					:subscribe-link="getSubscribeLink(userInfo)"
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
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import Searchbar from '~/components/searchbar/searchbar.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import CardSocials from '~/components/card-socials/card-socials.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import CardVideoSeries from '~/components/card-video-series/card-video-series.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';

const { t } = useI18n();
const userInfo = useUserInfo();
const alphabets = [...'abcdefghijklmnopqrstuvwxyz'];

const selectedAlphabet = ref('a');

const glossaries = [
	{
		alphabet: 'a',
		list: Array.from({ length: 15 }, () => ({
			url: '#',
			title: faker.lorem.words(2),
		})),
	},
	{
		alphabet: 'b',
		list: Array.from({ length: 12 }, () => ({
			url: '#',
			title: faker.lorem.words(1),
		})),
	},
	{
		alphabet: 'c',
		list: Array.from({ length: 10 }, () => ({
			url: '#',
			title: faker.lorem.words(1),
		})),
	},
];

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
