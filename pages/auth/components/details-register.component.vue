<template>
	<div class="space-y-2 px-4">
		<i18n-t
			keypath="register.details.header.head"
			tag="h1"
			class="font-serif text-4xl font-normal text-dark-100"
		>
			<span class="font-semibold text-red-100">
				{{ t('register.details.header.tail') }}</span
			>
		</i18n-t>
		<p class="text-base font-normal text-dark-100">
			{{ t('register.details.subtitle') }}
		</p>
	</div>
	<form class="w-full space-y-6 px-4 text-sm" @submit="onSubmit">
		<TextField
			v-model="account.mobile"
			:label="t('register.details.phone-number')"
			required
			type="tel"
		/>
		<SelectField
			v-model="account.gender"
			:options="genders"
			:placeholder="t('shared.gender')"
			required
		/>

		<TextField
			v-model="account.professionalEmail"
			:label="t('shared.professional-email')"
			type="email"
			:icon="IconMail"
			required
		/>

		<p>
			{{ t('shared.professional-email.text.part1') }}
			<span class="font-semibold">
				{{ t('shared.professional-email.text.part2') }}
			</span>
			{{ t('shared.professional-email.text.part3') }}
			<span class="underline">
				{{ t('shared.professional-email.text.part4') }}
			</span>
		</p>

		<SelectField
			v-model="account.employmentRelationship"
			:options="employmentRelationships"
			required
		/>

		<Suspense>
			<DetailsRegisterBoxes
				v-model:model-value-company-network="account.companyNetwork"
				v-model:model-value-bank="account.bank"
				v-model:model-value-manager-type="account.managerType"
				v-model:model-value-promoter-since="account.promoterSince"
				v-model:model-value-position="account.position"
				v-model:model-value-asset-size="account.assetSize"
				v-model:model-value-province="account.province"
				:employment-relationship="account.employmentRelationship"
				:initial-values="account"
			/>
		</Suspense>

		<div class="flex gap-3">
			<button
				type="button"
				class="bg-dark-100 p-3 text-white-100 hover:bg-dark-200"
				@click="$emit('back', account)"
			>
				<IconChevronLeft class="mr-1 h-4 w-4" />
			</button>
			<button
				type="submit"
				class="w-full bg-dark-100 p-3 font-semibold text-white-100 hover:bg-dark-200 disabled:opacity-50"
				:disabled="!stepValid"
			>
				{{ t('shared.continue') }}
			</button>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconMail, IconChevronLeft } from '~/icons';
import TextField from '~/components/text-field/text-field.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
import DetailsRegisterBoxes from './details-register-boxes.component.vue';

const emit = defineEmits(['update:secondStep', 'back']);
const props = defineProps<{ initialValues: unknown }>();

const { t } = useI18n();

const employmentRelationships = [
	{ text: t('register.details.select-job-type'), value: '' },
	{
		text: t('register.details.employment-relationships.agency'),
		value: 'agenziaMandato',
	},
	{
		text: t('register.details.employment-relationships.bank'),
		value: 'dipendenteBancario',
	},
];

const account = ref({
	mobile: '',
	gender: '',
	professionalEmail: '',
	employmentRelationship: '',
	bank: '',
	companyNetwork: '',
	managerType: '',
	promoterSince: '',
	position: '',
	province: '',
	assetSize: '',
	...(props.initialValues as {}),
});

const genders = [
	{ text: t('gender.select-text'), value: '' },
	{ text: t('shared.gender.male'), value: 'male' },
	{ text: t('shared.gender.female'), value: 'female' },
];

const stepValid = computed(() => {
	const fieldsToPass = [
		account.value.mobile,
		account.value.gender,
		account.value.professionalEmail,
		account.value.employmentRelationship,
		account.value.bank || account.value.companyNetwork,
		account.value.managerType,
		account.value.promoterSince,
		account.value.position,
		account.value.province,
		account.value.assetSize,
	];

	return fieldsToPass.every(Boolean);
});

function onSubmit(e: Event) {
	e.preventDefault();

	if (stepValid.value) emit('update:secondStep', account.value);
}
</script>
