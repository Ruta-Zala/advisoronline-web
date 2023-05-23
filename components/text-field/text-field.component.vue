<template>
	<div class="relative">
		<input
			:id="id"
			:type="type"
			:placeholder="placeholder"
			:value="modelValue"
			:required="props.required"
			:readonly="props.readonly"
			:class="[
				{
					'pl-4 pr-10': icon && iconPosition === 'right',
					'pl-10 pr-4': icon && iconPosition === 'left',
					'px-4': !icon,
					'bg-transparent': !readonly,
					'bg-[#EBEBE4]': readonly,
				},
				'border-1 border-gray-300',
				'focus:border-blue-600 peer block',
				'w-full appearance-none',
				'focus:outline-none focus:ring-0',
			]"
			@input="
				$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
			"
		/>
		<component
			:is="icon"
			v-if="icon"
			:class="{
				'left-4': iconPosition === 'left',
				'right-4': iconPosition === 'right',
			}"
			class="absolute bottom-1/2 h-4 w-4 translate-y-1/2"
		/>
		<button
			v-if="showPasswordIcon"
			type="button"
			tabindex="-1"
			class="absolute bottom-1/2 right-4 focus:outline-none"
			@click="showPassword = !showPassword"
		>
			<IconEye class="h-5 w-5 translate-y-1/2 border-none text-grey-100" />
		</button>
		<label
			v-if="label"
			:for="id"
			:class="[
				{
					'left-9': iconPosition === 'left' && icon,
					'left-4': !iconPosition || !icon || iconPosition === 'right',
					'bg-white-100': !readonly,
					'bg-[#EBEBE4]': readonly,
				},
				'absolute top-2 z-[1]',
				'origin-left -translate-y-4 scale-75 transform px-1 duration-300',
				' peer-focus:text-blue-100',
				'pointer-events-none cursor-text',
				'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
				'peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75',
			]"
			>{{ label }}</label
		>
	</div>
</template>

<script lang="ts" setup>
import { type Component, ref, computed, PropType } from 'vue';
import { IconEye } from '~/icons';

const props = defineProps({
	id: {
		type: String,
		default: undefined,
	},
	placeholder: {
		type: String,
		default: ' ',
	},
	icon: {
		type: Object as PropType<Component>,
		default: undefined,
	},
	iconPosition: {
		type: String,
		default: 'left',
	},
	modelValue: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		default: undefined,
	},
	type: {
		type: String,
		default: 'text',
	},
	showPasswordIcon: {
		type: Boolean,
		default: false,
	},
	required: {
		type: Boolean,
	},
	disabled: {
		type: Boolean,
	},
	readonly: {
		type: Boolean,
	},
});

defineEmits(['update:modelValue']);

const showPassword = ref(false);
const type = computed(() =>
	props.type === 'password' && showPassword.value ? 'text' : props.type,
);
</script>
