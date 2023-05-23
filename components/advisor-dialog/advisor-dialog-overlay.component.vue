<template>
	<TransitionChild
		as="template"
		enter="duration-300 ease-out"
		enter-from="opacity-0"
		enter-to="opacity-100"
		leave="duration-200 ease-in"
		leave-from="opacity-100"
		leave-to="opacity-0"
	>
		<div v-bind="$attrs" class="fixed inset-0 bg-dark-400/70" />
	</TransitionChild>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TransitionChild } from '@headlessui/vue';

export default defineComponent({
	components: { TransitionChild },
	inheritAttrs: false,
});
</script>
