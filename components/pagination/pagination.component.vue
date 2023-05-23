<template>
	<ul class="inline-flex flex-wrap items-center gap-y-2 text-sm tracking-wider">
		<li>
			<button
				class="p-2 duration-150 hover:text-red-100"
				:disabled="modelValue <= 0"
				@click="emit('update:modelValue', modelValue - 1)"
			>
				<IconChevronLeft class="h-3.5 w-3.5" />
			</button>
		</li>
		<li v-if="!areFirstPagesVisible && !areAllPagesVisible">
			<button class="px-4 py-2" @click="emit('update:modelValue', 0)">
				{{ '1' }}
			</button>
		</li>
		<li v-if="!areFirstPagesVisible && !areAllPagesVisible">
			<p class="px-4">...</p>
		</li>
		<template v-if="areFirstPagesVisible && !areAllPagesVisible">
			<li v-for="page in 9" :key="page - 1">
				<button
					:class="{
						'bg-red-100 font-medium text-white-100': modelValue === page - 1,
						'duration-150 hover:text-red-100': modelValue !== page - 1,
					}"
					class="px-4 py-2"
					:disabled="page - 1 === modelValue"
					@click="emit('update:modelValue', page - 1)"
				>
					{{ page }}
				</button>
			</li>
			<li>
				<p class="px-4">...</p>
			</li>
			<li>
				<button
					:class="{
						'bg-red-100 font-medium text-white-100': modelValue === pages - 2,
						'duration-150 hover:text-red-100': modelValue !== pages - 2,
					}"
					class="px-4 py-2"
					:disabled="modelValue === pages - 2"
					@click="emit('update:modelValue', pages - 2)"
				>
					{{ pages - 1 }}
				</button>
			</li>
			<li>
				<button
					:class="{
						'bg-red-100 font-medium text-white-100': modelValue === pages - 1,
						'duration-150 hover:text-red-100': modelValue !== pages - 1,
					}"
					:disabled="modelValue === pages - 1"
					class="px-4 py-2"
					@click="emit('update:modelValue', pages - 1)"
				>
					{{ pages }}
				</button>
			</li>
		</template>
		<template v-if="!areFirstPagesVisible && !areAllPagesVisible">
			<li v-if="isPrevPageVisible">
				<button
					class="px-4 py-2 duration-150 hover:text-red-100"
					@click="emit('update:modelValue', modelValue - 1)"
				>
					{{ modelValue }}
				</button>
			</li>
			<li v-if="isCurrentVisible">
				<p class="bg-red-100 px-4 py-2 font-medium text-white-100">
					{{ modelValue + 1 }}
				</p>
			</li>
			<li v-if="isNextPageVisible">
				<button
					class="px-4 py-2 duration-150 hover:text-red-100"
					@click="emit('update:modelValue', modelValue + 1)"
				>
					{{ modelValue + 2 }}
				</button>
			</li>
			<li v-if="areSecondDotsVisible">
				<p class="px-4">...</p>
			</li>
			<li>
				<button
					class="px-4 py-2"
					:class="{
						'bg-red-100 font-medium text-white-100': modelValue === pages - 2,
						'duration-150 hover:text-red-100': modelValue !== pages - 2,
					}"
					:disabled="modelValue === pages - 2"
					@click="emit('update:modelValue', pages - 2)"
				>
					{{ pages - 1 }}
				</button>
			</li>
			<li>
				<button
					class="px-4 py-2"
					:class="{
						'bg-red-100 font-medium text-white-100': modelValue === pages - 1,
						'duration-150 hover:text-red-100': modelValue !== pages - 1,
					}"
					:disabled="modelValue === pages - 1"
					@click="emit('update:modelValue', pages - 1)"
				>
					{{ pages }}
				</button>
			</li>
		</template>
		<template v-if="areAllPagesVisible">
			<li v-for="page in pages" :key="page - 1">
				<button
					:class="{
						'bg-red-100 font-medium text-white-100': modelValue === page - 1,
						'duration-150 hover:text-red-100': modelValue !== page - 1,
					}"
					:disabled="page - 1 === modelValue"
					class="px-4 py-2"
					@click="emit('update:modelValue', page - 1)"
				>
					{{ page }}
				</button>
			</li>
		</template>
		<li>
			<button
				class="p-2 duration-150 hover:text-red-100"
				:disabled="modelValue >= pages - 1"
				@click="emit('update:modelValue', modelValue + 1)"
			>
				<IconChevronRight class="h-3.5 w-3.5" />
			</button>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import IconChevronRight from '~/icons/icon-chevron-right.component.vue';
import IconChevronLeft from '~/icons/icon-chevron-left.component.vue';

export interface PaginationProps {
	pages: number;
	modelValue: number;
}

const emit = defineEmits(['update:modelValue']);
const props = defineProps<PaginationProps>();

const areFirstPagesVisible = computed(() => props.modelValue < 8);
const areAllPagesVisible = computed(() => props.pages < 12);
const isPrevPageVisible = computed(() => props.modelValue < props.pages - 1);
const isCurrentVisible = computed(() => props.modelValue < props.pages - 2);
const isNextPageVisible = computed(() => props.modelValue < props.pages - 3);
const areSecondDotsVisible = computed(() => props.modelValue < props.pages - 4);
</script>
