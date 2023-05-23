<template>
	<div>
		<h1 class="py-4 text-3xl">
			{{ t('shared.error.page-not-found') }}
		</h1>
		<div class="py-4">
			<NuxtLink to="/" class="text-red-100">Back to home</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const event = useRequestEvent();

setResponseStatus(event, 404, t('shared.error.page-not-found'));
</script>
