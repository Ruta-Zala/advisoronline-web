<template>
	<div
		:class="{
			'border-8 border-blue-100': showFrame,
			'border border-grey-100': !showFrame,
		}"
		class="relative overflow-hidden text-white-100"
	>
		<img
			:src="image"
			:alt="'image'"
			class="absolute h-full w-full object-cover"
		/>
		<div
			class="relative bg-dark-200/80 px-3 pb-5 pt-24 text-center sm:pb-5 sm:pt-40 lg:pt-56"
		>
			<h4
				:class="{ 'bg-blue-100': showFrame }"
				class="absolute left-0 top-0 pb-3 pl-6 pr-4 pt-6 text-[13px] tracking-wide"
			>
				{{ t('card-event.prefix') }}
				<span class="font-light">| {{ writer }}</span>
			</h4>
			<button class="absolute right-6 top-6 duration-150 hover:text-red-100">
				<IconBookmark
					:class="{
						'stroke-white-100': !isSaved,
						'fill-red-100 text-red-100 hover:fill-red-200 hover:text-red-200':
							isSaved,
					}"
					class="h-5 w-5"
				/>
			</button>
			<a :href="url" class="flex flex-col items-center justify-end">
				<h2 class="font-serif text-3xl font-medium tracking-wide">
					{{ date }}
				</h2>
				<div class="mb-2 mt-2 flex items-center justify-center gap-2">
					<IconLocation class="h-5 w-5" />
					<p class="text-sm font-medium tracking-wide">{{ location }}</p>
				</div>
				<h3 class="text-md font-light tracking-wide">
					{{ startingTime }} - {{ endingTime }}
				</h3>
				<div class="my-5 w-14 border-b border-white-100/80"></div>
				<h2 class="font-serif text-[26px] font-medium tracking-wide">
					{{ title }}
				</h2>
				<p
					v-if="description"
					class="mt-3 px-3 text-sm font-medium tracking-wider"
				>
					{{ description }}
				</p>
			</a>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconLocation from '~/icons/icon-location-marker.component.vue';
import IconBookmark from '~/icons/icon-bookmark.component.vue';

export interface CardEventProps {
	date: string;
	location: string;
	startingTime: string;
	endingTime: string;
	title: string;
	description?: string;
	writer: string;
	isSaved: boolean;
	image: string;
	showFrame: boolean;
	url: string;
}

const { t } = useI18n();

defineProps<CardEventProps>();
</script>
