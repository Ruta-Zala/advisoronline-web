<template>
	<div class="space-y-4 text-center text-dark-100">
		<IconSparkles class="mx-auto h-12 w-12" />
		<h1 class="font-serif text-[26px] font-normal">
			{{ title }}
		</h1>
		<p class="pb-8 text-sm font-semibold">
			{{ description }}
		</p>
		<div class="mx-auto w-full lg:w-2/3">
			<div class="grid grid-cols-2 gap-10">
				<div
					v-for="(reason, index) in updatedList"
					:key="index"
					class="space-y-6 text-center"
				>
					<hr v-if="index > 1" class="mx-auto w-20 border-dark-100" />
					<component :is="reason.icon" class="mx-auto h-10 w-10" />
					<h1 class="font-serif text-[21px] font-medium">
						<span class="text-red-100">{{ reason.head }}</span>
						{{ reason.tail }}
					</h1>
					<p class="leading-7">
						{{ reason.description }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { type Component, computed } from 'vue';
import { IconSparkles } from '~/icons';

export interface CardSubscriptionReasonProps {
	title: string;
	description: string;
	list: Array<{
		icon: Component;
		title: string;
		highlightWords: number;
		description: string;
	}>;
}

const props = defineProps<CardSubscriptionReasonProps>();

const updatedList = computed(() => {
	return props.list.map((item) => {
		const words = item.title.split(' ');
		const head = words.slice(0, item.highlightWords);
		const tail = words.slice(item.highlightWords + 1);
		return {
			...item,
			head: head.join(' '),
			tail: tail.join(' '),
		};
	});
});
</script>
