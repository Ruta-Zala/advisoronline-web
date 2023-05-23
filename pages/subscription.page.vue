<template>
	<div>
		<div class="container-cancel">
			<PrivateMagazine v-bind="privateMagazines" />
		</div>
		<div class="my-20 flex justify-center">
			<div class="mt-36 w-full space-y-6 text-center lg:w-2/3">
				<IconCake class="mx-auto h-12 w-12" />
				<i18n-t
					keypath="subscription.header.head"
					tag="h1"
					class="font-serif text-[26px] font-normal"
				>
					<span class="text-red-100">
						{{ t('subscription.header.tail') }}
					</span>
				</i18n-t>
				<p class="pb-4 text-sm">
					{{ t('subscription.subtitle') }}
				</p>
				<a
					href="/auth/register"
					class="bg-red-100 px-6 py-4 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
				>
					{{ t('subscription.create-account') }}
				</a>
			</div>
		</div>
		<div class="container my-20 w-full lg:w-3/4">
			<Subscribe v-bind="subscribeArgs" />
		</div>
		<CardSubscriptionReason v-bind="subscriptionReasons" />
		<div class="container-cancel mt-80">
			<div class="relative pb-8 pt-10">
				<img
					src="/images/book-dark.png"
					:alt="'book dark image'"
					class="absolute -top-10 left-0 h-full w-full object-cover"
				/>
				<div
					class="relative -mt-80 flex items-center justify-center text-dark-100"
				>
					<img
						:src="image1"
						class="-mr-8 mb-4 h-[278px] w-[152px] drop-shadow-subscription"
					/>

					<img
						:src="image2"
						class="relative mb-4 h-[417px] w-[295px] drop-shadow-subscription"
					/>

					<img
						:src="image3"
						class="-ml-8 mb-4 h-[278px] w-[205px] drop-shadow-subscription"
					/>
				</div>
				<div
					class="relative mx-auto w-full space-y-8 py-10 text-center text-white-100 lg:w-2/4"
				>
					<h1 class="font-serif text-[26px] font-normal">
						{{ t('subscription.access-text') }}
					</h1>
					<i18n-t keypath="subscription.access.title.head" tag="p">
						<span class="font-bold">
							{{ t('subscription.access.title.tail') }}
						</span>
					</i18n-t>
					<div>
						<a
							href="/auth/register"
							class="cursor-pointer bg-red-100 px-6 py-4 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
						>
							{{ t('subscription.create-free-account') }}
						</a>
					</div>
					<div class="text-[26px]">{{ t('shared.or') }}</div>
					<p class="text-base font-bold">
						{{ t('subscription.unlock-features') }}
					</p>
				</div>
				<div class="mx-auto flex w-11/12 flex-col gap-4 lg:flex-row">
					<CardSubscription
						v-for="item in subscriptionGroups"
						v-bind="item"
						:key="item.key"
						class="w-full"
					/>
				</div>
				<div
					class="relative mx-auto w-full py-16 text-center text-grey-100 lg:w-8/12"
				>
					<p>
						{{ t('shared.subscription.description') }}
					</p>
				</div>
			</div>
			<div class="container lg:w-2/3">
				<IconLight class="mx-auto h-10 w-10" />
				<h1 class="mt-4 text-center text-[34px] font-normal">
					{{ t('shared.faqs') }}
				</h1>
				<div class="divide-y divide-grey-100">
					<Accordion
						v-for="item in faqList"
						:key="item.title"
						:title="item.title"
					>
						{{ item.body }}
					</Accordion>
				</div>
			</div>
		</div>
		<div class="container-cancel relative mt-14 h-[300px]">
			<div
				class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
			>
				{{ t('shared.ad-space') }}
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import IconBook from '~/components/subscribe-newsletter/components/icon-book-open.component.vue';
import PrivateMagazine from '~/components/private-magazine/private-magazine.component.vue';
import Subscribe from '~/components/subscribe/subscribe.component.vue';
import CardSubscriptionReason from '~/components/card-subscription-reason/card-subscription-reason.component.vue';
import CardSubscription from '~/components/card-subscription/card-subscription.component.vue';
import Accordion from '~/components/accordion/accordion.component.vue';
import {
	IconDigital,
	IconCreditCard,
	IconCake,
	IconTrendingUp,
	IconChartBar,
	IconRefresh,
	IconUserNormal,
	IconLight,
} from '~/icons';
import { getFakeImage } from '~~/utils/get-fake-image';
import { SubscriptionsDocument } from './graphql/queries/subscriptions.query';
import { useSubscriptions } from '~/utils/subscription';

const { t } = useI18n();
const { data } = await useAsyncQuery(SubscriptionsDocument);
const subscriptionGroups = useSubscriptions(
	data.value?.subscriptionSubscriptions?.data ?? [],
);

const image1 = getFakeImage(205, 278);
const image2 = getFakeImage(281, 412);
const image3 = getFakeImage(205, 278);
const privateMagazines = {
	title: t('subscription.magazine.title'),
	description: t('subscription.magazine.description'),
	shortDescription: t('subscription.magazine.short-description'),
	image1: { text: 'Advisor maggio', image: image1 },
	image2: {
		text: 'Magazine N.22 - Erik Stattin',
		image: image2,
	},
	image3: { text: 'AP Advisor Private', image: image3 },
	categories: [
		{ name: t('subscription.magazine.format.digital'), icon: IconDigital },
		{ name: t('subscription.magazine.format.print'), icon: IconBook },
		{ name: t('subscription.magazine.format.multiple'), icon: IconCreditCard },
	],
};

const subscribeArgs = {
	title: t('shared.no-subscription'),
	description: t('shared.subscription.discover-reasons'),
	price: 18,
	link: '#',
};

const subscriptionReasons = {
	title: t('subscription.good-reasons.title'),
	description: t('subscription.good-reasons.description'),
	list: [
		{
			icon: IconTrendingUp,
			title: 'A unique editorial proposal',
			highlightWords: 2,
			description:
				'Open Financial Communication is the only company to offer a wide and varied editorial offer dedicated exclusively to the world of financial advice and managed savings.',
		},
		{
			icon: IconChartBar,
			title: '15 years market authority',
			highlightWords: 2,
			description:
				'We speak exclusively to financial advisors , private bankers and all operators active in the world of managed savings. A story that has led the main sector associations to choose us as media partners for large institutional events',
		},
		{
			icon: IconRefresh,
			title: 'Stay updated with current changes on economics',
			highlightWords: 2,
			description:
				'With the  DIGITAL version  in  preview  compared to the paper ADVISOR and ADVISOR PRIVATE are your indispensable tools to always have a  timely and updated picture  on the economic events that affect your work.',
		},
		{
			icon: IconUserNormal,
			title: 'Independent thinking and view',
			highlightWords: 1,
			description:
				'We offer and guarantee you the materials of reflection and analysis necessary to create a personal independent point of view, just as our publishing house Open Financial Communication is independent .',
		},
	],
};

const faqList = [
	{
		title: 'Can i sign up as professional without being register on OCF?',
		body: 'Yes! you can sign up without being register on OCF.',
	},
	{
		title: 'Do I need to pay later for the account?',
		body: 'No! the account is totally free and you can use as much as you want.',
	},
	{
		title: 'Do i need to have auto-renew enabled?',
		body: 'No! the subscriptions is one time pay for the specified amount fo time. At the end of that period your subscription will auotmaticaly renew for nother similar period of time. However, you can revoke the auto renewal at any point.',
	},
];
</script>
