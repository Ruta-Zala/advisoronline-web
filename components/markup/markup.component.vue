<template>
	<!-- eslint-disable vue/no-v-html -->
	<div v-html="sanitized" />
	<!-- eslint-enable vue/no-v-html -->
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import dompurify from 'isomorphic-dompurify';

export interface MarkupProps {
	html: string;
}

const props = defineProps<MarkupProps>();
const sanitized = computed(() => dompurify.sanitize(props.html));
</script>
