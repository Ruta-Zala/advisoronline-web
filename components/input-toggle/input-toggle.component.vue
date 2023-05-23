<template>
	<Switch
		:model-value="modelValue"
		:disabled="disabled"
		:class="[
			{
				'bg-grey-100': !modelValue,
				'bg-red-100': modelValue,
				'opacity-50': disabled,
				'h-5 w-10': size === 'small',
				'h-8 w-16': size === 'large',
			},
			'relative inline-flex items-center rounded-full',
		]"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<span
			:class="[
				{
					'h-4 w-4': size === 'small',
					'translate-x-0.5': !modelValue && size === 'small',
					'translate-x-[1.375rem]': modelValue && size === 'small',

					'h-6 w-6': size === 'large',
					'translate-x-1': !modelValue && size === 'large',
					'translate-x-9': modelValue && size === 'large',
				},
			]"
			class="inline-block transform rounded-full bg-white-100 duration-150"
		/>
	</Switch>
</template>

<script lang="ts" setup>
import { Switch } from '@headlessui/vue';
import { PropType } from 'vue';

defineProps({
	disabled: {
		type: Boolean,
		default: false,
	},
	modelValue: {
		type: Boolean,
		required: true,
	},
	size: {
		type: String as PropType<'small' | 'large'>,
		default: 'small',
	},
});

defineEmits(['update:modelValue']);
</script>
