<template>
	<ul class="flex">
		<li v-for="(tab, index) in props.tabs" :key="index">
			<button
				:class="[
					{
						'bg-red-100 text-white-100': modelValue === index,
						'text-dark-100 ': props.variant === 'light' && modelValue !== index,
						'text-white-100': props.variant === 'dark' && modelValue !== index,
					},
					'px-6 py-4 uppercase',
				]"
				@click="$emit('update:modelValue', index)"
			>
				<span
					:class="[
						{ 'border-b-2': modelValue === index },
						'py-1 hover:border-b-2',
					]"
				>
					{{ tab }}
				</span>
			</button>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { ThemeVariant } from '~/constants/theme-variant';

export interface PartnerTabsProps {
	tabs: Array<string>;
	modelValue: number;
	variant?: ThemeVariant;
}

const props = withDefaults(defineProps<PartnerTabsProps>(), {
	variant: 'light',
});

defineEmits<{
	(e: 'update:modelValue', $event: number): void;
}>();
</script>
