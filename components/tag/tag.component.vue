<template>
	<component
		:is="props.url ? 'a' : 'span'"
		:href="props.url"
		class="inline-flex items-center gap-2 px-1.5 py-3 text-xs font-semibold uppercase tracking-wide duration-75 hover:bg-grey-100/30"
		:class="{
			'bg-grey-200 text-dark-200': props.variant === 'light',
			'border border-dark-300 bg-dark-100 text-white-100':
				props.variant === 'dark',
		}"
	>
		{{ props.name }}
		<IconTag v-if="props.icon" class="h-4 w-4" />
	</component>
</template>

<script lang="ts" setup>
import { ThemeVariant } from '~/constants/theme-variant';
import IconTag from '~/icons/icon-tag.component.vue';

export interface TagProps {
	icon?: boolean;
	name: string;
	url?: string;
	variant?: ThemeVariant;
}

const props = withDefaults(defineProps<TagProps>(), {
	icon: undefined,
	url: undefined,
	variant: 'light',
});
</script>
