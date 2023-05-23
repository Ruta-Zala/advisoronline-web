<template>
	<div
		class="relative py-3 md:py-6 lg:py-10"
		:class="{
			'container': !props.fluid,
			'container-fluid': props.fluid,
			'bg-white-100 text-dark-200': props.variant === 'light',
			'bg-dark-100 text-white-100': props.variant === 'dark',
		}"
	>
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { ThemeVariant } from '~/constants/theme-variant';

interface ContainerProps {
	variant?: ThemeVariant;
	fluid?: boolean;
}

const props = withDefaults(defineProps<ContainerProps>(), {
	variant: 'light',
	fluid: false,
});
</script>
