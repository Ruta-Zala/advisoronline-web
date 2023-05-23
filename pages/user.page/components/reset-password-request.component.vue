<template>
	<AdvisorDialogContianer
		:model-value="props.show"
		@update:model-value="$emit('hideDialog')"
	>
		<AdvisorDialogOverlay />
		<AdvisorDialogPanel
			class="w-full bg-white-100 p-6 text-dark-200 lg:w-[600px]"
		>
			<button
				class="flex w-full justify-end outline-none"
				@click="$emit('hideDialog')"
			>
				<IconClose class="h-4 w-4 text-grey-100" />
			</button>
			<div
				class="relative flex flex-col items-center justify-center p-5 text-center md:px-4"
			>
				<IconCheck class="mb-6 h-[42px] w-[60px] text-red-100" />
				<h2 class="font-serif text-[26px] font-bold tracking-wide">
					{{ t('user.reset-password.request-sent') }}
				</h2>
				<hr class="my-4 w-20" />
				<div class="text-sm font-semibold leading-7 tracking-wide">
					{{ t('user.reset-password.check-email') }}
				</div>
			</div>
		</AdvisorDialogPanel>
	</AdvisorDialogContianer>
</template>
<script lang="ts" setup>
import AdvisorDialogContianer from '~/components/advisor-dialog/advisor-dialog.component.vue';
import AdvisorDialogOverlay from '~/components/advisor-dialog/advisor-dialog-overlay.component.vue';
import AdvisorDialogPanel from '~/components/advisor-dialog/advisor-dialog-panel.component.vue';
import { IconClose, IconCheck } from '~/icons';

const props = withDefaults(defineProps<{ show?: boolean }>(), {
	show: false,
});

const { t } = useI18n();

defineEmits(['hideDialog']);
</script>
