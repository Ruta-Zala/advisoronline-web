<template>
	<ProfileFullLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('subscription.shared.header')"
		:sub-header="t('subscription.subheader')"
	>
		<section class="mt-8">
			<BlockHeader :title="t('shared.active-subscription')" class="mb-6" />
			<Subscribe v-bind="subscribeArgs" class="mb-6" />
			<p class="text-sm">
				{{ t('shared.subscription.description') }}
			</p>
		</section>

		<section class="mt-20">
			<BlockHeader :title="t('subscription.payment-registry')" class="mb-6" />
			<p class="flex items-center justify-center bg-grey-200 py-4 text-sm">
				{{ t('subscription.no-payments') }}
			</p>
		</section>

		<section class="mt-20">
			<BlockHeader :title="t('subscription.advisor-plans')" class="mb-20" />
			<div class="mx-auto mb-32 flex w-11/12 flex-col gap-10 lg:flex-row">
				<CardSubscription
					v-for="item in subscriptionGroups"
					v-bind="item"
					:key="item.key"
					class="w-full"
				/>
			</div>
		</section>
	</ProfileFullLayout>
</template>

<script lang="ts" setup>
import ProfileFullLayout from '~/layouts-extended/profile-full.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import Subscribe from '~/components/subscribe/subscribe.component.vue';
import CardSubscription from '~/components/card-subscription/card-subscription.component.vue';
import { SubscriptionsDocument } from '../graphql/queries/subscriptions.query';
import { useSubscriptions } from '~/utils/subscription';

definePageMeta({ layout: false });

const { t } = useI18n();
const { data } = await useAsyncQuery(SubscriptionsDocument);
const subscriptionGroups = useSubscriptions(
	data.value?.subscriptionSubscriptions?.data ?? [],
);

const breadcrumbsArgs = {
	list: [{ name: t('shared.account'), url: '/user' }],
	current: t('subscription.shared.header'),
};

const subscribeArgs = {
	title: t('shared.no-subscription'),
	description: t('shared.subscription.discover-reasons'),
	price: 18,
	link: '#',
};
</script>
