<template>
	<div class="mb-2 flex gap-2.5 self-end text-grey-100">
		<button class="h-6 w-6" @click="$emit('controlsPrev')">
			<IconChevronLeft class="m-auto h-4 w-4" />
		</button>
		<button class="h-6 w-6" @click="$emit('controlsNext')">
			<IconChevronRight class="m-auto h-4 w-4" />
		</button>
	</div>
</template>

<script lang="ts" setup>
import { IconChevronRight, IconChevronLeft } from '~/icons';

defineEmits(['controlsPrev', 'controlsNext']);
</script>
