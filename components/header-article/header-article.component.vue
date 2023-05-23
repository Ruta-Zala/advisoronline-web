<template>
	<div class="text-center">
		<div v-if="readingTime" class="flex items-center justify-center gap-2">
			<IconClock class="h-4 w-4" />
			<p class="text-[13px]">
				{{ t('header-article.reading-time', { readingTime: readingTime }) }}
			</p>
		</div>
		<h1 class="my-5 font-serif text-4xl font-semibold tracking-wide">
			{{ title }}
		</h1>
		<p class="text-[13px] font-semibold">
			{{ date }}<span v-if="author" class="font-normal"> | {{ author }}</span>
		</p>
	</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconClock from '~/icons/icon-clock.component.vue';

export interface HeaderArticleProps {
	title: string;
	readingTime?: number;
	date: string;
	author?: string;
}

const { t } = useI18n();

defineProps<HeaderArticleProps>();
</script>
