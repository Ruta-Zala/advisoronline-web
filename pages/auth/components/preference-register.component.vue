<template>
	<div class="space-y-2 px-4">
		<i18n-t
			keypath="register.preference.header.head"
			tag="h1"
			class="font-serif text-4xl font-normal text-dark-100"
		>
			<span class="font-semibold text-red-100">
				{{ t('register.preference.header.tail') }}</span
			>
		</i18n-t>
		<p class="text-base font-normal text-dark-100">
			<i18n-t keypath="register.preference.subtitle-part1.head" tag="span">
				<span class="font-bold">
					{{ t('register.preference.subtitle-part1.tail') + ' ' }}
				</span>
			</i18n-t>
			<i18n-t
				keypath="register.preference.subtitle-part2.head"
				tag="span"
				class="text-base font-normal text-dark-100"
			>
				<i>{{ t('register.preference.subtitle-part2.tail') }}</i>
			</i18n-t>
		</p>
	</div>
	<form class="w-full space-y-4 px-4 text-sm">
		<h1 class="text-sm font-semibold">
			{{ t('register.preference.select-content-preferences') }}
		</h1>
		<div class="flex gap-3">
			<Checkbox
				:text="t('shared.preference.italian')"
				:icon="IconScale"
				:model-value="contentPreferences.includes('italianMutualFunds')"
				@update:model-value="preferencesChange($event, 'italianMutualFunds')"
			/>
			<Checkbox
				:text="t('shared.preference.foreign')"
				:icon="IconScale"
				:model-value="contentPreferences.includes('foreignMutualFunds')"
				@update:model-value="preferencesChange($event, 'foreignMutualFunds')"
			/>
		</div>
		<div class="flex gap-3">
			<Checkbox
				:text="t('shared.preference.pension')"
				:icon="IconSmiley"
				:model-value="contentPreferences.includes('pensionFunds')"
				@update:model-value="preferencesChange($event, 'pensionFunds')"
			/>
			<Checkbox
				:text="t('shared.preference.insurance-products')"
				:icon="IconLock"
				:model-value="contentPreferences.includes('insuranceProducts')"
				@update:model-value="preferencesChange($event, 'insuranceProducts')"
			/>
		</div>
		<div class="flex gap-3">
			<Checkbox
				:text="t('shared.preference.asset-management')"
				:icon="IconOfficeBuilding"
				:model-value="contentPreferences.includes('assetManagement')"
				@update:model-value="preferencesChange($event, 'assetManagement')"
			/>
			<Checkbox
				:text="t('shared.preference.titles')"
				:icon="IconLibrary"
				:model-value="contentPreferences.includes('titles')"
				@update:model-value="preferencesChange($event, 'titles')"
			/>
		</div>
		<div class="flex">
			<Checkbox v-model="acceptNewsLetter" />
			<p class="ml-3">
				{{ t('register.preference.consent') }}
			</p>
		</div>
		<div class="flex gap-3">
			<button
				type="button"
				class="bg-dark-100 p-3 text-white-100 hover:bg-dark-200"
				@click="
					$emit('back', {
						acceptNewsLetter,
						contentPreferences,
					})
				"
			>
				<IconChevronLeft class="mr-1 h-4 w-4" />
			</button>
			<button
				type="button"
				class="w-full bg-dark-100 p-3 font-semibold text-white-100 hover:bg-dark-200"
				@click="
					$emit('update:completeAllStep', {
						acceptNewsLetter,
						contentPreferences,
					})
				"
			>
				{{ t('register.preference.complete-account-creation') }}
			</button>
		</div>

		<ul class="ml-4 list-disc text-red-100">
			<li v-for="error in errors" :key="error">
				{{ error }}
			</li>
		</ul>
	</form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconChevronLeft } from '~/icons/';
import Checkbox from '~/components/input-checkbox/input-checkbox.component.vue';

import {
	IconScale,
	IconSmiley,
	IconLock,
	IconOfficeBuilding,
	IconLibrary,
} from '~/icons/';

defineEmits(['update:completeAllStep', 'back']);
const props = defineProps<{ initialValues: any; errors: string[] }>();

const { t } = useI18n();

const acceptNewsLetter = ref(props.initialValues.acceptNewsLetter ?? false);
const contentPreferences = ref<string[]>(
	props.initialValues.contentPreferences ?? [],
);

function preferencesChange(checked: boolean, value: string) {
	const newValues = contentPreferences.value.filter((p) => p !== value);
	contentPreferences.value = checked ? [...newValues, value] : newValues;
}
</script>
