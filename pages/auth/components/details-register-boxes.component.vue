<template>
	<div v-if="employmentRelationship" class="space-y-6">
		<SelectField
			v-if="employmentRelationship === 'dipendenteBancario'"
			:options="companyNetworksOptions"
			:model-value="modelValueCompanyNetwork"
			@update:model-value="$emit('update:modelValueCompanyNetwork', $event)"
		/>
		<SelectField
			v-if="employmentRelationship === 'agenziaMandato'"
			:options="banksOptions"
			:model-value="modelValueBank"
			@update:model-value="$emit('update:modelValueBank', $event)"
		/>
		<SelectField
			:options="managerTypesOptions"
			:model-value="modelValueManagerType"
			@update:model-value="$emit('update:modelValueManagerType', $event)"
		/>
		<SelectField
			:options="promoterSinceOptions"
			:model-value="modelValuePromoterSince"
			@update:model-value="$emit('update:modelValuePromoterSince', $event)"
		/>
		<SelectField
			:options="positionsOptions"
			:model-value="modelValuePosition"
			@update:model-value="$emit('update:modelValuePosition', $event)"
		/>
		<SelectField
			:options="assetsSizesOptions"
			:model-value="modelValueAssetSize"
			@update:model-value="$emit('update:modelValueAssetSize', $event)"
		/>
		<SelectField
			:options="provincesOptions"
			:model-value="modelValueProvince"
			@update:model-value="$emit('update:modelValueProvince', $event)"
		/>
	</div>
</template>

<script lang="ts" setup>
import SelectField from '~/components/select-field/select-field.component.vue';
import { RegisterFieldsDocument } from './details-register-boxes.query';

defineProps<{
	employmentRelationship: string;

	modelValueCompanyNetwork: string;
	modelValueBank: string;
	modelValueManagerType: string;
	modelValuePromoterSince: string;
	modelValuePosition: string;
	modelValueAssetSize: string;
	modelValueProvince: string;
}>();

defineEmits([
	'update:modelValueCompanyNetwork',
	'update:modelValueBank',
	'update:modelValueManagerType',
	'update:modelValuePromoterSince',
	'update:modelValuePosition',
	'update:modelValueAssetSize',
	'update:modelValueProvince',
]);

const { t } = useI18n();

const { data } = await useAsyncQuery(RegisterFieldsDocument);

const companyNetworksOptions = computed(() => {
	return createOptionsForDynamic(
		t('shared.select-network'),
		data.value?.companyNetworks?.data,
	);
});

const banksOptions = computed(() => {
	return createOptionsForDynamic(
		t('register.details.select-bank'),
		data.value?.banks?.data,
	);
});

const managerTypesOptions = computed(() => {
	return createOptionsForStatic(
		t('shared.kind-of-manager'),
		data.value?.managerTypes,
	);
});

const promoterSinceOptions = computed(() => {
	return createOptionsForStatic(
		t('shared.been-consultant'),
		data.value?.promoterSinceMap,
	);
});

const positionsOptions = computed(() => {
	return createOptionsForStatic(
		t('register.details.select-position'),
		data.value?.positions,
	);
});

const assetsSizesOptions = computed(() => {
	return createOptionsForStatic(
		t('register.details.select-asset-size'),
		data.value?.assetsSizes,
	);
});

const provincesOptions = computed(() => {
	return createOptionsForStatic(t('shared.location'), data.value?.provinces);
});
</script>
