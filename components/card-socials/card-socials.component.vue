<template>
	<div
		:class="{ 'bg-dark-100 text-white-100': dark, 'bg-white-100': !dark }"
		class="flex flex-col items-center justify-center border border-grey-100 py-8"
	>
		<h3 class="text-center font-serif text-[21px] font-bold">
			{{ t('follow-us') }}
		</h3>
		<div class="my-4 w-20 border-b border-red-100"></div>
		<div class="mx-2 flex flex-wrap items-center justify-center gap-5">
			<div v-for="(social, index) in socials" :key="index">
				<a :href="social.url" target="_blank" rel="noopener">
					<component
						:is="social.icon"
						class="h-5 w-5 duration-75 hover:text-red-100"
					/>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { socials } from '~/utils/socials';

export interface CardSocialsProps {
	dark?: boolean;
}

const { t } = useI18n();

defineProps<CardSocialsProps>();
</script>
