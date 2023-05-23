<template>
	<AdvisorDialog
		class="z-20"
		:model-value="modelValue"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<AdvisorDialogOverlay />
		<AdvisorDialogPanel
			class="flex flex-col items-center px-5 py-7 text-center sm:py-14 md:px-20"
		>
			<button
				class="absolute right-5 top-8"
				@click="$emit('update:modelValue', false)"
			>
				<IconClose class="h-4 w-4 text-grey-100" />
			</button>
			<IconTag class="m-auto mb-6 h-14 w-14 text-grey-100" />
			<h2 class="font-serif text-[26px] font-bold">
				{{ t('shared.quick-tags') }}
			</h2>
			<hr class="m-auto mb-5 mt-3 w-16" />
			<p class="mb-4 text-sm font-semibold tracking-wide">
				{{ t('tags-modal.text') }}
			</p>
			<div
				class="flex max-w-2xl flex-wrap justify-center gap-x-2 gap-y-3.5 text-xs"
			>
				<button
					v-for="(tag, index) in tags"
					:key="index"
					class="bg-grey-200 px-1.5 py-3 font-semibold uppercase tracking-wide duration-75 hover:bg-grey-100/30"
				>
					{{ tag.name }}
				</button>
			</div>
		</AdvisorDialogPanel>
	</AdvisorDialog>
</template>

<script lang="ts" setup>
import IconTag from '~/icons/icon-tag.component.vue';
import IconClose from '~/icons/icon-close.component.vue';
import AdvisorDialog from '~/components/advisor-dialog/advisor-dialog.component.vue';
import AdvisorDialogPanel from '~/components/advisor-dialog/advisor-dialog-panel.component.vue';
import AdvisorDialogOverlay from '~/components/advisor-dialog/advisor-dialog-overlay.component.vue';

defineProps<{
	modelValue: boolean;
}>();

defineEmits(['update:modelValue']);

const { t } = useI18n();

const tags = [
	{
		name: 'Jump to',
	},
	{
		name: 'Tag1',
	},
	{
		name: 'Glossary',
	},
	{
		name: 'News',
	},
	{
		name: 'Careers and professionals',
	},
	{
		name: 'Network numbers',
	},
	{
		name: 'Jump to',
	},
	{
		name: 'Network numbers',
	},
	{
		name: 'Networks',
	},
	{
		name: 'Associations',
	},
];
</script>
