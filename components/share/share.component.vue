<template>
	<div
		:class="{ 'bg-dark-100 text-white-100': dark, 'bg-white-100': !dark }"
		class="border border-grey-100 py-8 text-center"
	>
		<h3 class="mb-4 font-serif text-[21px] font-bold">
			{{ t('shared.share') }}
		</h3>
		<div class="flex flex-wrap items-center justify-center gap-5">
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

export interface ShareProps {
	shareOptions: {
		url?: string;
		body?: string;
		text?: string;
	};
	dark?: boolean;
}

const { t } = useI18n();

defineProps<ShareProps>();
</script>
