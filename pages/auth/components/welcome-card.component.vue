<template>
	<div class="space-y-4 px-4 text-center text-dark-100">
		<div class="pb-3 pt-6"><IconSparkles class="mx-auto h-10 w-10" /></div>

		<i18n-t
			keypath="welcome.header.head"
			tag="h1"
			class="font-serif text-4xl font-normal"
		>
			<span class="font-semibold text-red-100">
				{{ t('welcome.header.tail') }}</span
			>
		</i18n-t>

		<hr class="mx-auto w-20" />
		<p class="font-serif text-2xl font-bold">
			{{ t('welcome.subtitle') }}
		</p>
		<p class="px-2 text-sm font-semibold">
			{{ t('welcome.description') }}
		</p>
		<hr class="mx-auto my-2 w-20" />
		<ul class="list-disc space-y-2 px-4 text-left text-[16px] md:px-12">
			<li>{{ t('shared.feature.access-magazines') }}</li>
			<li>{{ t('shared.feature.exclusive-articles') }}</li>
			<li>{{ t('shared.feature.follow-news') }}</li>
			<li>{{ t('shared.feature.receive-notifications') }}</li>
			<li>{{ t('welcome.features.exclusive-events') }}</li>
			<li>{{ t('welcome.features.news-analysis') }}</li>
		</ul>
	</div>
	<a
		href="/"
		class="mx-4 block bg-dark-100 p-3 text-center text-sm font-semibold text-white-100 hover:bg-dark-200"
	>
		{{ t('welcome.discover-experience') }}
	</a>
</template>

<script lang="ts" setup>
import { IconSparkles } from '~/icons';

const { t } = useI18n();
</script>
