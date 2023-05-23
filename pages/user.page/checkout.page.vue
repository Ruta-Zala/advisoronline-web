<template>
	<ProfileFullLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('user.checkout.header')"
		:sub-header="t('user.checkout.subheader')"
	>
		<div class="mt-8 flex w-full flex-col lg:flex-row">
			<div class="mb-4 w-full border-r-grey-100 lg:w-1/5 lg:border-r">
				<div
					class="relative flex items-center justify-center text-dark-100 lg:justify-start"
				>
					<img
						:src="image1"
						class="-mr-8 mb-4 h-[151px] w-[111px] shadow-[20px_35px_50px_-15px_rgba(0,0,0,0.3),5px_5px_0_rgba(0,0,0,0.08)]"
					/>

					<img
						:src="image2"
						class="relative mb-4 h-[198px] w-[146px] shadow-[20px_35px_50px_-15px_rgba(0,0,0,0.3),5px_5px_0_rgba(0,0,0,0.08)]"
					/>
				</div>
				<h1 class="mt-4 pr-8 text-center font-serif text-[21px] font-medium">
					{{ t('shared.stay-informed') }}
				</h1>
			</div>
			<div class="w-full px-4 pb-8 lg:w-4/5 lg:px-12">
				<BlockHeader
					:title="t('user.checkout.subscription-details')"
					class="mb-6"
				/>
				<div class="space-y-6">
					<button
						class="flex items-center gap-2 bg-red-100 px-10 py-4 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
					>
						<IconSparkles class="h-5 w-5" />
						{{ t('shared.consumer-choice') }}
					</button>
					<ul class="space-y-4 text-sm font-semibold">
						<li
							v-for="(consumerChoice, index) in consumerChoices"
							:key="index"
							class="flex items-center gap-3"
						>
							<IconCheck class="h-4 w-4 text-green-2" />{{ consumerChoice }}
						</li>
					</ul>
					<hr class="text-grey-100" />
					<div class="space-y-6 pr-4 text-sm font-semibold">
						<div class="flex items-center justify-between">
							<div>
								<h1>{{ t('user.checkout.base-version') }}</h1>
							</div>
							<div>{{ '50 €' }}</div>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<label class="flex gap-3">
									<Toggle
										v-model="subscriptionDetails.addPrintVersion"
									></Toggle>
									{{ t('shared.print-version') }}
								</label>
							</div>
							<div>{{ '50 €' }}</div>
						</div>
						<div class="flex items-center justify-between">
							<div class="w-60">
								<SelectField
									id="deliveryLocation"
									v-model="subscriptionDetails.deliveryLocation"
									:options="[{ text: 'Estero', value: '' }]"
									:label="t('user.checkout.delivery-location')"
								/>
							</div>
							<div>{{ '120 €' }}</div>
						</div>
						<div class="flex items-center justify-between">
							<div class="w-60">
								<TextField
									id="promoCode"
									v-model="subscriptionDetails.promoCode"
									:label="t('user.checkout.promo-code')"
								/>
							</div>
							<div>{{ '- 30 €' }}</div>
						</div>
					</div>
					<hr class="text-grey-100" />
					<div
						class="flex w-full justify-between bg-red-100 p-4 text-base text-white-100"
					>
						<h1 class="font-semibold">{{ t('user.checkout.total-price') }}</h1>
						<h1 class="font-bold">{{ '190 €' }}</h1>
					</div>
					<div class="w-full font-semibold">
						<BlockHeader
							:title="t('shared.billing-address')"
							:hide-underline="false"
							class="mb-10"
						/>
						<div class="space-y-4">
							<div class="flex flex-wrap gap-4 md:gap-0">
								<div class="w-full md:mb-0 md:w-1/2 md:pr-3">
									<TextField
										id="name"
										v-model="user.billingName"
										:label="t('shared.name')"
									/>
								</div>
								<div class="w-full md:w-1/2 md:pl-3">
									<TextField
										id="surname"
										v-model="user.billingSurname"
										:label="t('shared.surname')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="address"
										v-model="user.billingAddress"
										:label="t('shared.address')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="city"
										v-model="user.billingCity"
										:label="t('shared.city')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="province"
										v-model="user.billingProvince"
										:label="t('shared.province')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="cap"
										v-model="user.billingCap"
										:label="t('shared.cap')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="village"
										v-model="user.billingVillage"
										:label="t('shared.village')"
									/>
								</div>
							</div>
						</div>

						<BlockHeader
							:title="t('shared.shipping-address')"
							:hide-underline="false"
							class="my-10"
						/>

						<label class="mb-4 flex items-center gap-3 text-sm font-semibold">
							<Toggle v-model="shippingAddressSameAsBilling"></Toggle>
							{{ t('shared.use-billing-address') }}
						</label>

						<div v-if="!shippingAddressSameAsBilling" class="space-y-4">
							<div class="flex flex-wrap gap-4 md:gap-0">
								<div class="w-full md:mb-0 md:w-1/2 md:pr-3">
									<TextField
										id="name"
										v-model="user.shippingName"
										:label="t('shared.name')"
									/>
								</div>
								<div class="w-full md:w-1/2 md:pl-3">
									<TextField
										id="surname"
										v-model="user.shippingSurname"
										:label="t('shared.surname')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="address"
										v-model="user.shippingAddress"
										:label="t('shared.address')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="city"
										v-model="user.shippingCity"
										:label="t('shared.city')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="province"
										v-model="user.shippingProvince"
										:label="t('shared.province')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="cap"
										v-model="user.shippingCap"
										:label="t('shared.cap')"
									/>
								</div>
							</div>
							<div class="flex flex-wrap">
								<div class="w-full">
									<TextField
										id="village"
										v-model="user.shippingVillage"
										:label="t('shared.village')"
									/>
								</div>
							</div>
						</div>
					</div>
					<BlockHeader
						:title="t('user.checkout.payment-method')"
						:hide-underline="false"
						class="mb-10"
					/>
					<p class="text-sm">
						{{ t('user.checkout.payment-preferable-method') }}
					</p>
					<div
						class="flex flex-col items-center justify-between gap-4 border border-red-100 p-4 md:flex-row md:gap-0"
					>
						<div>
							<h1 class="font-serif text-[21px] font-medium text-red-100">
								{{ t('user.checkout.paypal-credit-card') }}
							</h1>
							<p class="text-sm font-normal">
								{{ t('user.checkout.subscription-active') }}:
							</p>
						</div>
						<div><PaypalLogo /></div>
					</div>
					<div class="border border-grey-100 p-4">
						<div class="flex justify-between">
							<h1 class="font-serif text-[21px] font-medium">
								{{ t('user.checkout.bank-transfer') }}
							</h1>
							<div class="flex items-center gap-2">
								<IconLibrary class="h-6 w-6" />
								<IconCrossingArrows class="h-5 w-5" />
								<IconLibrary class="h-6 w-6" />
							</div>
						</div>
						<hr class="my-6 text-grey-100" />
						<ul class="space-y-4 text-sm font-semibold">
							<li
								v-for="(condition, index) in paymentConditions"
								:key="index"
								class="flex items-center gap-3"
							>
								<IconCheck class="h-4 w-4 text-green-2" />{{ condition }}
							</li>
						</ul>
						<div
							class="border-gray-500 relative my-8 flex h-28 items-center justify-center border border-dashed bg-grey-200"
						>
							<input
								type="file"
								multiple
								class="relative z-50 block h-full w-full cursor-pointer p-20 opacity-0"
							/>
							<div class="absolute m-auto p-10 text-center">
								{{ t('user.checkout.upload-receipt') }}
							</div>
						</div>

						<button
							type="button"
							class="w-full bg-red-100 p-3 px-12 py-3 font-semibold text-white-100 hover:bg-red-200"
						>
							{{ t('user.checkout.finalize-payment') }}
						</button>
						<a
							href="#"
							class="text-xm my-8 flex items-center justify-center gap-2 font-semibold text-red-100"
						>
							{{ t('user.checkout.send-instructions') }}
							<IconMailOpen class="h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</ProfileFullLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import {
	IconSparkles,
	IconCheck,
	IconLibrary,
	IconCrossingArrows,
	IconMailOpen,
} from '~/icons';
import ProfileFullLayout from '~/layouts-extended/profile-full.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import Toggle from '~/components/input-toggle/input-toggle.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
import TextField from '~/components/text-field/text-field.component.vue';
import PaypalLogo from '~~/assets/paypal-logo.component.vue';

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
		{
			name: t('user.checkout.my-subscriptions'),
			url: '/user/subscription',
		},
	],
	current: t('user.checkout.payment'),
};

const image1 = faker.image.abstract(111, 151);
const image2 = faker.image.abstract(146, 198);

const consumerChoices = [
	t('shared.annual-subscription'),
	t('shared.issues-news-magazine'),
	t('shared.advisor-private-releases'),
	t('shared.annual-releases'),
];

const subscriptionDetails = ref({
	addPrintVersion: true,
	deliveryLocation: '',
	promoCode: '',
});

const shippingAddressSameAsBilling = ref(true);

const user = ref({
	billingName: '',
	billingSurname: '',
	billingAddress: '',
	billingCity: '',
	billingProvince: '',
	billingCap: '',
	billingVillage: '',
	shippingName: '',
	shippingSurname: '',
	shippingAddress: '',
	shippingCity: '',
	shippingProvince: '',
	shippingCap: '',
	shippingVillage: '',
});

const paymentConditions = [
	'Intestato a Open Financial Communication S.r.l.',
	'IT42L0306909483100000010213',
];
</script>
