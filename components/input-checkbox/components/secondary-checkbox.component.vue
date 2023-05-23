<template>
	<svg height="24" width="24" fill="none">
		<path
			v-if="checked"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="m9 11 3 3L22 4"
		/>
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
		/>
	</svg>
</template>
<script lang="ts" setup>
defineProps({
	checked: {
		type: Boolean,
		default: false,
	},
});
</script>
