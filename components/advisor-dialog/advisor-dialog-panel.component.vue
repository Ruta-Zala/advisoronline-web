<template>
	<div class="fixed inset-0 overflow-y-auto">
		<div class="flex min-h-full items-center justify-center p-4">
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
					class="w-full max-w-4xl transform overflow-hidden bg-white-100 align-middle transition-all"
				>
					<slot />
				</DialogPanel>
			</TransitionChild>
		</div>
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
