<template>
	<div
		:class="{ 'bg-dark-100 text-white-100': dark, 'bg-white-100': !dark }"
		class="border border-grey-100 py-10"
	>
		<div class="mx-10 flex flex-col items-center text-center">
			<IconInbox class="mb-7 h-16 w-16 text-grey-100" />
			<h3 class="font-serif text-[21px] font-bold tracking-wide">
				{{ props.title }}
			</h3>
			<div
				:class="{ 'border-white-100': dark, 'border-red-100': !dark }"
				class="my-5 w-20 border-b"
			></div>
			<p class="mb-4 text-sm font-light">
				{{ props.subtitle }}
			</p>
			<a
				:href="subscribeLink"
				:class="{
					'bg-red-100 hover:bg-red-200': dark,
					'bg-dark-100 hover:bg-red-100': !dark,
				}"
				class="w-full py-4 text-xs font-medium tracking-wide text-white-100 duration-75"
			>
				{{ t('shared.subscribe-now') }}
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconInbox from './components/icon-inbox-in.component.vue';

export interface SubscribeNewsletterSidebarProps {
	title?: string;
	subtitle?: string;
	subscribeLink?: string;
	dark?: boolean;
}

const { t } = useI18n();

const props = withDefaults(defineProps<SubscribeNewsletterSidebarProps>(), {
	title: `Subscribe To Our Newsletter`,
	subtitle: `Don't miss the best articles of the week selected daily by the editorial staff`,
	subscribeLink: '/auth/register?subscribe=true',
});
</script>
