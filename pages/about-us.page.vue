<template>
	<div>
		<div class="container-cancel relative pb-40">
			<img
				:src="aboutUs.image"
				:alt="aboutUs.alternativeText"
				class="absolute -top-10 left-0 h-full w-full object-cover"
			/>
			<div class="relative flex justify-center text-center">
				<div class="w-full md:w-3/4 lg:w-1/2">
					<h1 class="mt-8 text-[10rem] text-red-100">{{ 'o' }}</h1>
					<h2
						class="-mt-4 mb-4 font-serif text-[34px] font-semibold text-white-100"
					>
						{{ aboutUs.title }}
					</h2>
					<p class="font-serif text-[26px] text-white-100">
						{{ aboutUs.subtitle }}
					</p>
				</div>
			</div>
		</div>
		<div class="flex justify-center lg:mt-4">
			<div class="w-full lg:w-3/4">
				<div class="prose min-w-full text-center">
					<Markup class="font-serif text-[21px]" :html="aboutUs.subheading" />
				</div>
				<hr class="mx-auto my-8 w-12 text-red-100" />
				<BlockHeader :title="aboutUs.bodyTitle" class="mb-4 mt-8" />
				<div class="prose min-w-full">
					<Markup :html="aboutUs.body" />
				</div>
				<BlockHeader :title="aboutUs.peopleTitle" class="mb-4 mt-8" />
				<div class="divide-y divide-grey-100">
					<div v-for="person in people" :key="person.id">
						<div
							class="my-8 flex flex-col items-start gap-4 text-left lg:flex-row"
						>
							<img
								:src="person.image"
								class="mx-auto aspect-square h-40 w-40 object-cover md:ml-0 md:mr-6"
								alt=""
							/>
							<div class="space-y-2">
								<h4 class="text-[13px] font-bold">{{ person.role }}</h4>
								<h1 class="font-serif text-[21px] font-medium">
									{{ person.name }}
								</h1>
								<p class="text-justify text-[14px]">{{ person.description }}</p>
							</div>
						</div>
					</div>
				</div>
				<BlockHeader :title="aboutUs.contactsTitle" class="my-8" />
				<div class="flex flex-wrap justify-center gap-20">
					<div
						v-for="contact in contacts"
						:key="contact.id"
						class="space-y-4 text-center"
					>
						<component :is="contact.icon" class="mx-auto h-10 w-10" />
						<h1 class="mx-auto w-60 font-serif text-[21px] font-medium">
							{{ contact.title }}
						</h1>
						<div>
							<a
								:href="'mailto:' + contact.email"
								class="text-base font-bold text-red-100"
							>
								{{ contact.email }}
							</a>
						</div>
					</div>
				</div>
				<UserOffer v-bind="userOfferArgs" />
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
			<SectionThree v-slot="slide" v-bind="sectionThreeArgs">
				<CardVideoFour v-bind="slide" />
			</SectionThree>
			<NewsMagazine />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { faker } from '@faker-js/faker';
import Markup from '~/components/markup/markup.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import IconBook from '~/components/subscribe-newsletter/components/icon-book-open.component.vue';
import {
	IconUpload,
	IconBriefcase,
	IconClipboardList,
	IconInboxIn,
	IconUnlock,
} from '~/icons';
import UserOffer from '~/components/user-offer/user-offer.component.vue';
import SectionThree from '~/components/section-three/section-three.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import { AboutUsDocument } from './about-us.query';

const { t } = useI18n();

const icons = {
	IconBook,
	IconUpload,
	IconBriefcase,
	IconClipboardList,
	IconInboxIn,
};

const { data, error } = await useAsyncQuery(AboutUsDocument);

if (error.value) {
	throw createError(error.value);
}

const aboutUs = computed(() => {
	const sm = data.value?.siteManagerAboutUs?.data;
	const about = sm?.attributes;
	return {
		image: getImageUrl(about?.cover?.data),
		alternativeText: about?.cover?.data?.attributes?.alternativeText || '',
		title: about?.title,
		subtitle: about?.subtitle,
		subheading: about?.subheading || '',
		bodyTitle: about?.bodyTitle || '',
		body: about?.body || '',
		peopleTitle: about?.peopleTitle || '',
		contactsTitle: about?.contactsTitle || '',
	};
});

const people = computed(() => {
	const sm = data.value?.siteManagerAboutUs?.data;
	const people = (sm?.attributes?.people ?? []).filter(Boolean);
	return people.map((person) => ({
		id: person.id,
		image: getImageUrl(person?.image?.data),
		role: person.role,
		name: person.fullName,
		description: person.description,
	}));
});

const contacts = computed(() => {
	const sm = data.value?.siteManagerAboutUs?.data;
	const about = sm?.attributes;
	return about?.contacts?.map((contact) => ({
		id: contact?.id,
		icon: contact?.icon ? icons[contact?.icon] : '',
		title: contact?.title,
		email: contact?.email,
	}));
});

const userOfferArgs = {
	icon: IconUnlock,
	title: t('shared.user-offer.title'),
	description: [
		t('shared.user-offer.description.1'),
		`<br /><span class='text-red-100'>${t(
			'shared.user-offer.description.2',
		)}</span>`,
	].join(''),
	offers: [
		t('shared.feature.access-magazines'),
		t('shared.feature.exclusive-articles'),
		t('shared.feature.follow-news'),
		t('shared.feature.receive-notifications'),
	],
	loginText: t('shared.sign-in-login'),
};

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
