<template>
	<div :class="{ 'border-b border-grey-100': !hideUnderline }" class="pb-2.5">
		<div class="flex items-center justify-between">
			<div class="flex flex-wrap-reverse gap-3 divide-grey-100 lg:divide-x">
				<div>
					<img
						v-if="logo && logoOnTop"
						:src="logo"
						alt="image"
						class="mb-4 max-h-8"
					/>
					<div class="flex items-center gap-3">
						<component :is="leftIcon" v-if="leftIcon" class="h-5 w-5" />
						<h2
							:class="{ 'font-bold': boldFull }"
							class="font-serif text-[26px]"
						>
							<span class="font-bold">{{ processedTitle.head }}&nbsp;</span>
							<span>{{ processedTitle.tail }}</span>
						</h2>
					</div>
				</div>
				<img
					v-if="logo && !logoOnTop"
					:src="logo"
					alt="image"
					class="max-h-8 w-48 shrink-0 pl-2.5"
				/>
			</div>
			<slot name="append" />
		</div>
		<p v-if="description" class="mt-3.5 tracking-wide text-grey-100">
			{{ description }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { type Component, computed } from 'vue';
import { makeSnake } from '~/utils/make-snake';

export interface BlockHeaderProps {
	title: string;
	boldFull?: boolean;
	logo?: string;
	description?: string;
	hideUnderline?: boolean;
	logoOnTop?: boolean;
	leftIcon?: Component;
}

const props = defineProps<BlockHeaderProps>();
const processedTitle = computed(() => makeSnake(props.title));
</script>
