<template>
	<div
		:class="{
			'bg-white-100 text-dark-100': props.variant === 'light',
			'bg-dark-100 text-white-100': props.variant === 'dark',
		}"
		class="flex flex-col items-center gap-x-6 gap-y-8 p-6 sm:flex-row"
	>
		<div class="w-full shrink-0 bg-white-100 px-4 py-14 sm:w-1/2 md:w-1/3">
			<img
				:src="props.image"
				:alt="props.name"
				class="mx-auto w-full max-w-xs"
			/>
		</div>
		<Markup class="font-light tracking-wider" :html="props.description" />
	</div>
</template>
<script lang="ts" setup>
import { ThemeVariant } from '~~/constants/theme-variant';
import Markup from '~/components/markup/markup.component.vue';

export interface PartnerDetailsProps {
	description: string;
	image: string;
	name: string;
	variant?: ThemeVariant;
}

const props = withDefaults(defineProps<PartnerDetailsProps>(), {
	variant: 'dark',
});
</script>
