<template>
	<div class="fixed inset-0 overflow-y-auto">
		<TransitionChild
			as="template"
			enter="duration-300 ease-out"
			enter-from="opacity-0 scale-95"
			enter-to="opacity-100 scale-100"
			leave="duration-200 ease-in"
			leave-from="opacity-100 scale-100"
			leave-to="opacity-0 scale-95"
		>
			<DialogPanel
				v-bind="$attrs"
				class="relative flex min-h-full flex-col items-center p-10 text-center"
			>
				<slot />
			</DialogPanel>
		</TransitionChild>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DialogPanel, TransitionChild } from '@headlessui/vue';

export default defineComponent({
	components: { DialogPanel, TransitionChild },
	inheritAttrs: false,
});
</script>
