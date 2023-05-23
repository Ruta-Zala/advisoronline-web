<template>
	<a
		:href="url"
		:class="{ 'flex-col': description, 'border-b border-grey-100': underline }"
		class="flex items-start gap-4 py-2 md:flex-row"
	>
		<div
			v-if="image"
			:class="{
				'md:h-24 md:w-24': imageSize !== 'medium',
				'md:h-28 lg:w-40': imageSize === 'medium',
				'h-24 w-24': imageSize !== 'medium' && !description,
				'w-34 h-24 sm:h-32 lg:w-52': imageSize === 'medium' && !description,
			}"
			class="relative shrink-0 overflow-hidden"
		>
			<img :src="image" alt="Image" class="h-full w-full object-cover" />
		</div>
		<div class="w-full">
			<h5 class="mt-2 text-[13px] font-bold">
				{{ category }}
				<span v-if="author" class="font-medium">| {{ author }}</span>
				<span v-if="bookmarked" class="float-right">
					<IconBookmark class="h-5 w-5 fill-red-100 text-red-100" />
				</span>
			</h5>
			<span v-if="date" class="float-right">
				{{ date }}
			</span>
			<h1 class="my-2 font-serif text-[18px] leading-6 tracking-wider">
				{{ title }}
			</h1>
			<p v-if="description" class="text-sm font-medium tracking-wide">
				<!-- Hydration text content mismatch in <p> -->
				{{ description.trim() }}
			</p>
		</div>
	</a>
</template>

<script lang="ts" setup>
import { IconBookmark } from '~/icons';
export interface CardTwoProps {
	image?: string;
	title: string;
	category: string;
	author?: string;
	description?: string;
	imageSize?: 'small' | 'medium';
	underline?: boolean;
	url: string;
	date?: string;
	bookmarked?: boolean;
}

defineProps<CardTwoProps>();
</script>
