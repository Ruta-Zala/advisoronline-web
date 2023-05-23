<template>
	<a :href="url" class="relative block">
		<img :src="image" alt="img" class="absolute h-full w-full object-cover" />
		<div
			class="group relative border border-white-100/0 bg-dark-400/75 px-6 py-10 text-center text-white-100/100 duration-150 hover:border-white-100/80 hover:bg-dark-400/90"
		>
			<div class="relative inline-block max-w-xs">
				<!-- Placeholder of same h3 size -->
				<div
					class="invisible mb-3 line-clamp-1 font-serif text-[21px] font-semibold"
					aria-hidden="true"
				>
					&nbsp;
				</div>
				<h3
					:class="[
						'line-clamp-1 font-serif text-[21px] font-semibold duration-150',
						'absolute inset-x-0 top-1/2 -translate-y-1/2 group-hover:top-0 group-hover:translate-y-0',
					]"
				>
					{{ title }}
				</h3>
				<p
					class="line-clamp-4 text-sm font-light leading-7 tracking-wide opacity-0 duration-150 group-hover:opacity-100"
				>
					{{ description }}
				</p>
			</div>
		</div>
	</a>
</template>

<script lang="ts" setup>
export interface QuickJumpProps {
	title: string;
	description: string;
	image: string;
	url: string;
}

defineProps<QuickJumpProps>();
</script>
