<template>
	<TransitionRoot appear :show="modelValue" as="template">
		<Dialog
			as="div"
			class="relative z-10"
			@close="$emit('update:modelValue', false)"
		>
			<slot />
		</Dialog>
	</TransitionRoot>
</template>

<script lang="ts" setup>
import { Dialog, TransitionRoot } from '@headlessui/vue';

defineProps<{ modelValue: boolean }>();
defineEmits(['update:modelValue']);
</script>
