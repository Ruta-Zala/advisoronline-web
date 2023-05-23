<template>
	<ProfileLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('news-sources.shared.header')"
		:sub-header="t('news-sources.subheader')"
	>
		<div class="mb-8 flex items-center justify-between">
			<div class="w-4/5">
				<h1 class="font-serif text-[26px] font-bold">
					{{ t('news-sources.preferences') }}
				</h1>
			</div>
			<div>
				<label class="flex items-start">
					<span class="mr-3 mt-1 text-xs font-semibold uppercase">
						{{ t('shared.select-all') }}
					</span>
					<Checkbox
						v-model="selectAll"
						variant="secondary"
						@update:model-value="onSelectAllChange"
					/>
				</label>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-3 pb-8 md:grid-cols-2">
			<Checkbox
				v-for="(source, index) in sources"
				:key="index"
				v-model="source.checked"
				:icon="IconGlobe"
				:text="source.text"
				@update:model-value="onUpdateSourceModelValue"
			/>
		</div>
		<div class="flex items-end justify-end pb-8 lg:pb-0">
			<button
				class="bg-red-100 px-12 py-4 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
			>
				{{ t('shared.save-preferences') }}
			</button>
		</div>
	</ProfileLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import ProfileLayout from '~/layouts-extended/profile.layout.vue';
import Checkbox from '~/components/input-checkbox/input-checkbox.component.vue';
import { IconGlobe } from '~/icons';

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
			name: t('shared.professional'),
			url: '#',
		},
	],
	current: t('news-sources.shared.header'),
};

const selectAll = ref(false);

const sources = ref(
	Array.from({ length: 6 }, () => ({
		text: faker.name.jobArea(),
		checked: false,
	})),
);

function onUpdateSourceModelValue() {
	selectAll.value = sources.value.every((s) => s.checked);
}

function onSelectAllChange(checked: boolean) {
	for (const source of sources.value) {
		source.checked = checked;
	}
}
</script>
