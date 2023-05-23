<template>
	<ProfileLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('preferences.shared.header')"
		:sub-header="t('preferences.subheader')"
	>
		<BlockHeader
			:title="t('preferences.emails-from')"
			:hide-underline="false"
			class="mb-10"
		/>
		<div class="space-y-6 pb-8">
			<div class="flex items-center justify-between">
				<div class="w-full">
					<h1 class="font-bold">{{ t('preferences.today') }}</h1>
					<p class="text-sm">{{ t('preferences.daily-news') }}</p>
				</div>
				<div>
					<Toggle v-model="emailPreferences.today"></Toggle>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div class="w-full">
					<h1 class="font-bold">{{ t('preferences.weekly') }}</h1>
					<p class="text-sm">{{ t('preferences.weekly-news') }}</p>
				</div>
				<div>
					<Toggle v-model="emailPreferences.weekly"></Toggle>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div class="w-full">
					<h1 class="font-bold">{{ t('preferences.private') }}</h1>
					<p class="text-sm">{{ t('preferences.private-news') }}</p>
				</div>
				<div>
					<Toggle v-model="emailPreferences.private"></Toggle>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div class="w-full">
					<div :class="{ 'opacity-30': !preferenceInfo.professionalAccount }">
						<h1 class="font-bold">{{ t('preferences.professional') }}</h1>
						<p class="text-sm">
							{{ t('preferences.receive-notifications') }}
						</p>
					</div>
					<span
						v-if="!preferenceInfo.professionalAccount"
						class="text-sm text-red-100"
					>
						{{ t('preferences.professional-account') }}
					</span>
				</div>
				<div>
					<Toggle
						v-model="emailPreferences.professional"
						:disabled="!preferenceInfo.professionalAccount"
					></Toggle>
				</div>
			</div>
			<div class="flex items-center justify-between">
				<div class="w-full">
					<h1 class="font-bold">{{ t('preferences.authors-follow') }}</h1>
					<p class="text-sm">
						{{ t('preferences.post-new-article') }}
					</p>
				</div>
				<div>
					<Toggle v-model="emailPreferences.notification"></Toggle>
				</div>
			</div>
			<hr class="text-grey-100" />
			<div
				class="space-y-6 pb-8"
				:class="{ 'opacity-30': !preferenceInfo.enableNewsletter }"
			>
				<div class="flex items-center justify-between">
					<div class="w-4/5">
						<h1 class="font-serif text-[26px] font-bold">
							{{ t('preferences.newsletter-preferences') }}
						</h1>
						<p>{{ t('preferences.receive-newsletter') }}</p>
					</div>
					<div>
						<label class="flex items-start">
							<span class="mr-3 mt-1 text-xs font-semibold uppercase">
								{{ t('shared.select-all') }}
							</span>
							<Checkbox
								v-model="selectAll"
								variant="secondary"
								:disabled="!preferenceInfo.enableNewsletter"
								@update:model-value="onSelectAllChange"
							/>
						</label>
					</div>
				</div>
				<div class="grid grid-cols-1 gap-3 pb-8 md:grid-cols-2">
					<Checkbox
						v-for="(preference, index) in newsLetterPreferences"
						:key="index"
						v-model="preference.checked"
						:icon="preference.icon"
						:text="preference.text"
						:disabled="!preferenceInfo.enableNewsletter"
						@update:model-value="onUpdateNewsPreferenceModelValue"
					/>
				</div>
				<div class="flex">
					<Checkbox
						v-model="preferenceInfo.acceptNewsLetter"
						:disabled="!preferenceInfo.enableNewsletter"
					/>
					<p class="ml-3">
						{{ t('preferences.consent') }}
					</p>
				</div>
				<div class="flex items-end justify-end">
					<button
						:disabled="!preferenceInfo.enableNewsletter"
						class="bg-red-100 px-12 py-4 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
					>
						{{ t('shared.save-preferences') }}
					</button>
				</div>
			</div>
		</div>
	</ProfileLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ProfileLayout from '~/layouts-extended/profile.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import Toggle from '~/components/input-toggle/input-toggle.component.vue';
import Checkbox from '~/components/input-checkbox/input-checkbox.component.vue';
import {
	IconScale,
	IconSmiley,
	IconLock,
	IconOfficeBuilding,
	IconLibrary,
} from '~/icons/';

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
	current: t('preferences.shared.header'),
};

const preferenceInfo = ref({
	professionalAccount: false,
	enableNewsletter: false,
	acceptNewsLetter: false,
});

const emailPreferences = ref({
	today: true,
	weekly: true,
	private: true,
	professional: false,
	notification: false,
});

const selectAll = ref(false);

const newsLetterPreferences = ref([
	{
		text: t('shared.preference.italian'),
		icon: IconScale,
		checked: false,
	},
	{
		text: t('shared.preference.foreign'),
		icon: IconScale,
		checked: false,
	},
	{
		text: t('shared.preference.pension'),
		icon: IconSmiley,
		checked: false,
	},
	{
		text: t('shared.preference.insurance-products'),
		icon: IconLock,
		checked: false,
	},
	{
		text: t('shared.preference.asset-management'),
		icon: IconOfficeBuilding,
		checked: false,
	},
	{
		text: t('shared.preference.titles'),
		icon: IconLibrary,
		checked: false,
	},
]);

function onUpdateNewsPreferenceModelValue() {
	selectAll.value = newsLetterPreferences.value.every((s) => s.checked);
}

function onSelectAllChange(checked: boolean) {
	for (const source of newsLetterPreferences.value) {
		source.checked = checked;
	}
}
</script>
