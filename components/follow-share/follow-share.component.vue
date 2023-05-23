<template>
	<div
		class="flex flex-wrap justify-between gap-y-2 border-b border-grey-100 pb-5"
	>
		<div class="flex items-center gap-x-3.5 md:gap-x-5">
			<h4 class="font-serif font-medium tracking-wide">
				{{ t('shared.follow') }}
			</h4>
			<IconBookmark
				:class="{
					'fill-red-100 text-red-100': follow.saved,
					'fill-white-100 stroke-dark-100': !follow.saved,
				}"
				class="h-5 w-5"
			/>
			<IconHeart
				:class="{
					'text-red-100': follow.liked,
					'fill-white-100 stroke-dark-100 ': !follow.liked,
				}"
				class="h-5 w-5"
			/>
			<IconBook
				:class="{
					'text-red-100': follow.read,
					'fill-white-100 stroke-dark-100 ': !follow.read,
				}"
				class="h-5 w-5"
			/>
		</div>
		<div class="flex flex-wrap items-center gap-x-3.5 md:gap-x-5">
			<h4 class="font-serif font-medium tracking-wide">
				{{ t('shared.share') }}
			</h4>
			<template v-for="(item, index) in share" :key="index">
				<component
					:is="item.component"
					:share-options="{
						...shareOptions,
						mail: '',
						subject: 'Advisor online',
						hashtag: '#AdvisorOnline',
					}"
					:use-native-behavior="false"
				>
					<component
						:is="item.icon"
						class="h-5 w-5 duration-75 hover:text-red-100"
					/>
				</component>
			</template>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { share } from '~/utils/share-links';
import IconBook from '~/icons/icon-book-open.component.vue';
import IconHeart from '~/icons/icon-heart.component.vue';
import IconBookmark from '~/icons/icon-bookmark.component.vue';

export interface FollowShareProps {
	follow: {
		saved: boolean;
		liked: boolean;
		read: boolean;
	};
	shareOptions: {
		url?: string;
		body?: string;
		text?: string;
	};
}

const { t } = useI18n();

defineProps<FollowShareProps>();
</script>
