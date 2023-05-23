<template>
	<div class="relative">
		<select
			:id="id"
			:disabled="disabled"
			:required="required"
			:class="[
				'border-1 border-gray-300 bg-transparent',
				'focus:border-blue-600 peer block',
				'w-full appearance-none',
				'focus:outline-none focus:ring-0',
			]"
			:value="modelValue"
			@change="
				$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
			"
		>
			<option
				v-for="(option, index) in options"
				:key="index"
				:selected="modelValue === option.value"
				:value="option.value"
			>
				{{ option.text }}
			</option>
		</select>
		<label
			v-if="label"
			:class="[
				'absolute z-[1]',
				'left-5 top-2 origin-left -translate-y-4 scale-75 transform px-1',
				'bg-white-100 peer-focus:text-blue-100',
				'duration-300',
				'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
				'peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75',
			]"
		>
			{{ label }}
		</label>
	</div>
</template>

<script lang="ts" setup>
export interface SelectFieldProps {
	id?: string;
	disabled?: boolean;
	required?: boolean;
	modelValue: string;
	label?: string;
	options: Array<{
		text: string;
		value: string;
	}>;
}

defineEmits(['update:modelValue']);
defineProps<SelectFieldProps>();
</script>
