<template>
	<Switch
		:model-value="modelValue"
		:disabled="disabled"
		:class="{
			'opacity-50': disabled,
			'border-red-100 text-red-100': modelValue && variant === 'primary',
			'border-grey-100': !modelValue,
			'flex w-full items-center gap-4 border  px-3 py-5': icon || text,
		}"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<div class="flex w-full items-center justify-between">
			<div class="flex items-center">
				<component :is="icon" v-if="icon" class="h-6 w-6" />
				<p v-if="text" class="ml-3 font-light tracking-wide">
					{{ text }}
				</p>
			</div>
			<div
				v-if="variant === 'primary'"
				:class="{
					'border border-grey-100': !modelValue,
					'bg-red-100': modelValue,
				}"
				class="relative h-3.5 w-3.5 rounded-[3px]"
			>
				<div
					v-if="modelValue"
					class="absolute bottom-1/2 right-1/2 h-5 w-5 translate-x-1/2 translate-y-1/2 rounded border border-red-100"
				></div>
			</div>

			<div v-if="variant === 'secondary'">
				<SecondaryCheckbox :checked="modelValue" />
			</div>
		</div>
	</Switch>
</template>

<script lang="ts" setup>
import { Switch } from '@headlessui/vue';
import { PropType, type Component } from 'vue';
import SecondaryCheckbox from '~/components/input-checkbox/components/secondary-checkbox.component.vue';

defineProps({
	variant: {
		type: String as PropType<'primary' | 'secondary'>,
		default: 'primary',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	modelValue: {
		type: Boolean,
		required: true,
	},
	icon: {
		type: Object as PropType<Component>,
		default: undefined,
	},
	text: {
		type: String,
		default: undefined,
	},
});

defineEmits(['update:modelValue']);
</script>
