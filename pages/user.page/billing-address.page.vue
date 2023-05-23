<template>
	<ProfileLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('user.billing.header')"
		:sub-header="t('user.billing.subheader')"
	>
		<div class="pb-8">
			<form class="w-full font-semibold">
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
					<div
						v-if="shippingAddressSameAsBilling"
						class="flex w-full items-end justify-end"
					>
						<button
							type="button"
							class="bg-red-100 p-3 px-12 py-3 font-semibold text-white-100 hover:bg-red-200"
						>
							{{ t('shared.save') }}
						</button>
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
								:label="'shared.address'"
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
					<div class="flex w-full items-end justify-end">
						<button
							type="button"
							class="bg-red-100 p-3 px-12 py-3 font-semibold text-white-100 hover:bg-red-200"
						>
							{{ t('shared.save') }}
						</button>
					</div>
				</div>
			</form>
		</div>
	</ProfileLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ProfileLayout from '~/layouts-extended/profile.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import TextField from '~/components/text-field/text-field.component.vue';
import Toggle from '~/components/input-toggle/input-toggle.component.vue';

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
	current: t('user.billing.shared.header'),
};

const shippingAddressSameAsBilling = ref(false);

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
</script>
