<template>
	<Disclosure v-slot="{ open }" as="div" class="w-full">
		<DisclosureButton
			class="flex w-full justify-between py-6 duration-150 hover:text-red-100"
			:class="{ 'text-red-100': open }"
		>
			<h1 class="pr-4 text-left font-semibold tracking-wide">
				{{ title }}
			</h1>
			<IconPlus
				class="h-6 w-6 shrink-0 rounded-full duration-150"
				:class="{
					'rotate-45 border border-red-100': open,
					'border-red-100/0': !open,
				}"
			/>
		</DisclosureButton>
		<transition
			enter-active-class="transition duration-150 ease-out"
			enter-from-class="transform opacity-0"
			enter-to-class="transform opacity-100"
			leave-active-class="transition duration-75 ease-out"
			leave-from-class="transform opacity-100"
			leave-to-class="transform opacity-0"
		>
			<DisclosurePanel
				class="text-gray-500 -mt-2 pb-6 pr-8 leading-7 tracking-wide"
			>
				<slot />
			</DisclosurePanel>
		</transition>
	</Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import IconPlus from '~/icons/icon-plus.component.vue';

export interface AccordionProps {
	title: string;
}

defineProps<AccordionProps>();
</script>
