<template>
	<a :href="url" class="flex flex-col items-start gap-4 md:flex-row">
		<div
			class="relative h-60 w-full overflow-hidden md:h-40 md:w-96 md:max-w-xs lg:w-full"
		>
			<img
				:src="image"
				alt="Image"
				class="h-full max-h-60 w-full object-cover md:max-h-40"
			/>
			<div
				v-if="event"
				class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark-400/80 text-white-100"
			>
				<h2 class="font-serif text-[26px] font-semibold tracking-wide">
					{{ event.date }}
				</h2>
				<div class="flex items-center gap-2">
					<IconLocation class="h-5 w-5" />
					<h3 class="text-sm font-medium tracking-wider">
						{{ event.location }}
					</h3>
				</div>
				<div class="w-20 border-b"></div>
				<h3 class="text-sm font-medium tracking-wide">
					{{ event.startingTime }} - {{ event.endingTime }}
				</h3>
			</div>
		</div>
		<div class="w-full overflow-hidden">
			<h5 class="mt-2 text-[13px] font-semibold">
				{{ event ? 'Event' : category }}
			</h5>
			<h1
				class="my-2 truncate font-serif text-[21px] font-semibold tracking-wider"
				:title="title"
			>
				{{ title }}
			</h1>
			<p class="line-clamp-4 text-sm font-medium leading-normal tracking-wide">
				<!-- Hydration text content mismatch in <p> -->
				{{ description.trim() }}
			</p>
		</div>
	</a>
</template>

<script lang="ts" setup>
import IconLocation from '~/icons/icon-location-marker.component.vue';

export interface CardOneProps {
	image: string;
	title: string;
	category: string;
	description: string;
	event?: {
		date: string;
		location: string;
		startingTime: string;
		endingTime: string;
	};
	url: string;
}

defineProps<CardOneProps>();
</script>
