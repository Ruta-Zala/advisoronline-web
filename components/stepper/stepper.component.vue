<template>
	<div
		class="flex flex-col items-baseline pl-6 md:flex-row md:items-center md:p-8"
	>
		<template v-for="(step, index) in steps" :key="index">
			<div
				v-if="index !== 0"
				class="ml-[-1px] mt-[11.2px] w-6 flex-auto rotate-90 border-t-2 border-[#B1BDD6] transition duration-500 ease-in-out md:ml-0 md:mt-0 md:w-0 md:rotate-0"
			></div>
			<div class="text-white relative mt-2.5 flex items-center md:mt-0">
				<IconStepperActive
					v-if="step.status === 'active'"
					class="h-[22px] w-[22px]"
				/>
				<IconStepperCompleted
					v-if="step.status === 'completed'"
					class="h-[22px] w-[22px]"
				/>
				<IconStepperIdle
					v-if="step.status === 'idle'"
					class="h-[22px] w-[22px]"
				/>
				<div
					class="absolute top-0 ml-8 mt-1 w-28 text-left text-[10px] font-semibold uppercase text-[#2D2C4C] md:-ml-10 md:mt-8 md:text-center"
				>
					{{ step.name }}
				</div>
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import {
	IconStepperActive,
	IconStepperCompleted,
	IconStepperIdle,
} from '~/icons';

export type StepperStep = {
	name: string;
	status: 'completed' | 'active' | 'idle';
};

export interface StepperProps {
	steps: StepperStep[];
}

defineProps<StepperProps>();
</script>
