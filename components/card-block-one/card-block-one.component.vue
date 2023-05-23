<template>
	<a :href="url" :class="{ 'h-128': size === 'medium' }" class="relative block">
		<img
			:src="image"
			:alt="image"
			class="absolute h-full w-full object-cover"
		/>
		<div
			:class="{
				'pt-64 lg:pt-0': size === 'medium',
				'items-end': !description || size === 'small',
				'items-center': description && size === 'medium',
			}"
			class="relative left-0 top-0 flex h-full w-full bg-gradient-to-t from-dark-100 to-dark-100/50"
		>
			<div
				:class="{
					'm-8 text-white-100': !description || size === 'small',
					'flex h-full w-full flex-col justify-center bg-white-100 py-8 pr-6 text-dark-100 lg:max-w-md lg:py-0':
						description && size === 'medium',
				}"
				class=""
			>
				<h4
					:class="{
						'mb-2 bg-white-100 px-2 py-1.5 text-dark-100':
							!description || size === 'small',
						'mb-5 text-red-100': description && size === 'medium',
					}"
					class="inline-block text-[13px] font-semibold"
				>
					{{ category }}
				</h4>
				<h2
					:class="{
						'text-4xl': size === 'medium',
						'text-xl': size === 'small',
					}"
					class="mb-3 line-clamp-3 font-serif tracking-wider"
				>
					{{ title }}
				</h2>
				<p
					v-if="description && size === 'medium'"
					class="mb-8 mt-4 font-medium tracking-wide"
				>
					{{ description }}
				</p>
				<h4 class="text-[13px] font-medium tracking-wider">
					{{ date }}
				</h4>
			</div>
		</div>
	</a>
</template>

<script lang="ts" setup>
export interface CardBlockOneProps {
	size: 'medium' | 'small';
	image: string;
	category: string;
	title: string;
	date: string;
	description?: string;
	url: string;
}

defineProps<CardBlockOneProps>();
</script>
