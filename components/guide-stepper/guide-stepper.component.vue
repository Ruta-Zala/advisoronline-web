<template>
	<AdvisorDialog
		class="z-20"
		:model-value="modelValue"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<AdvisorDialogOverlay class="bg-dark-400/95" />
		<AdvisorDialogPanel class="p-7 pt-9">
			<div class="mb-6 flex justify-between px-2">
				<p class="text-xs font-semibold uppercase tracking-wider">
					{{ t('guide-stepper.onboarding-tour') }}
				</p>
				<button
					class="p-1.5 text-grey-100 duration-100 hover:text-red-100"
					@click="$emit('update:modelValue', false)"
				>
					<IconClose class="h-3 w-3" />
				</button>
			</div>
			<div v-if="activeGuide" class="text-center">
				<img
					:src="activeGuide.image"
					class="mb-8 h-full max-h-[310px] w-full object-cover"
				/>
				<h3 class="mb-2 font-serif text-2xl font-bold">
					{{ activeGuide.title }}
				</h3>
				<p class="text-sm tracking-wide">
					{{ activeGuide.description }}
				</p>
				<div class="my-8 flex justify-center gap-4">
					<button
						v-for="(item, index) in GuideStepper.length"
						:key="index"
						class="h-3 w-3 rounded-full border duration-100"
						:class="{
							'border-grey-100 hover:border-red-100': index !== activeStep,
							'border-red-100 bg-red-100': index === activeStep,
						}"
						@click="activeStep = index"
					/>
				</div>
			</div>
			<div class="flex gap-4 text-xs">
				<button
					v-if="activeStep === 0"
					class="w-full border border-grey-100 py-4 font-semibold uppercase tracking-wider duration-150 hover:border-red-100 hover:text-red-100"
					@click="$emit('update:modelValue', false)"
				>
					{{ t('guide-stepper.skip') }}
				</button>
				<button
					v-if="activeStep !== 0"
					class="w-full border border-grey-100 py-4 font-semibold uppercase tracking-wider duration-150 hover:border-red-100 hover:text-red-100"
					@click="activeStep--"
				>
					{{ t('guide-stepper.back') }}
				</button>
				<button
					v-if="activeStep !== GuideStepper.length - 1"
					class="w-full bg-red-100 py-4 font-medium uppercase tracking-wider text-white-100 duration-100 hover:bg-red-200"
					@click="activeStep++"
				>
					{{ t('guide-stepper.next') }}
				</button>
				<button
					v-if="activeStep === GuideStepper.length - 1"
					class="w-full bg-red-100 py-4 font-medium uppercase tracking-wider text-white-100 duration-100 hover:bg-red-200"
					@click="$emit('update:modelValue', false)"
				>
					{{ t('guide-stepper.start') }}
				</button>
			</div>
		</AdvisorDialogPanel>
	</AdvisorDialog>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AdvisorDialog from '~/components/advisor-dialog/advisor-dialog.component.vue';
import AdvisorDialogPanel from '~/components/advisor-dialog/advisor-dialog-panel.component.vue';
import AdvisorDialogOverlay from '~/components/advisor-dialog/advisor-dialog-overlay.component.vue';
import IconClose from '~/icons/icon-close.component.vue';
import { GuideStepper } from '~/utils/guide-stepper';

export interface GuideStepperProps {
	modelValue: boolean;
}
defineProps<GuideStepperProps>();
defineEmits(['update:modelValue']);

const { t } = useI18n();
const activeStep = ref(0);
const activeGuide = computed(() => GuideStepper.at(activeStep.value));
</script>
