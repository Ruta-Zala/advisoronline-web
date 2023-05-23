<template>
	<NuxtPage />
</template>

<script lang="ts" setup>
definePageMeta({
	layout: false,
	middleware: 'authenticated',
});
</script>
