<template>
	<div
		:class="{ 'bg-dark-100 text-white-100': dark, 'bg-white-100': !dark }"
		class="border border-grey-100 py-8"
	>
		<h3 class="mb-6 text-center font-serif text-[21px] font-bold">
			{{ t('shared.follow') }}
		</h3>
		<div class="flex items-center justify-center gap-5">
			<IconBookmark
				:class="{
					'fill-red-100 text-red-100': saved,
					'fill-dark-100 stroke-white-100': !saved && dark,
					'fill-white-100 stroke-dark-100 ': !saved && !dark,
				}"
				class="h-5 w-5"
			/>
			<IconHeart
				:class="{
					'text-red-100': liked,
					'fill-dark-100 stroke-white-100': !liked && dark,
					'fill-white-100 stroke-dark-100 ': !liked && !dark,
				}"
				class="h-5 w-5"
			/>
			<IconBook
				:class="{
					'text-red-100': read,
					'fill-dark-100 stroke-white-100': !read && dark,
					'fill-white-100 stroke-dark-100 ': !read && !dark,
				}"
				class="h-5 w-5"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconBook from '~/icons/icon-book-open.component.vue';
import IconHeart from '~/icons/icon-heart.component.vue';
import IconBookmark from '~/icons/icon-bookmark.component.vue';

export interface CardFollowProps {
	dark?: boolean;
	saved?: boolean;
	liked?: boolean;
	read?: boolean;
}

const { t } = useI18n();

defineProps<CardFollowProps>();
</script>
