<template>
	<div class="relative pb-8 pt-10">
		<img
			src="/images/book-dark.png"
			alt="img"
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<div
			class="relative mx-10 flex flex-col items-center text-center text-white-100"
		>
			<IconInbox class="mb-6 h-14 w-14" />
			<h3 class="font-serif text-[21px] font-semibold tracking-wide">
				{{ props.title }}
			</h3>
			<div class="mb-4 mt-2.5 w-20 border-b border-red-100"></div>
			<p class="mb-5 text-sm font-light tracking-wider">
				{{ props.subtitle }}
			</p>
			<div class="mb-10 flex flex-wrap items-center justify-center gap-y-5">
				<div
					v-for="(item, index) in categories"
					:key="index"
					class="flex gap-3 border-r border-grey-100/80 px-4 last:border-none md:px-8"
				>
					<IconBook class="h-5 w-5" />
					<p class="text-sm font-medium tracking-wide">{{ item }}</p>
				</div>
			</div>
			<a
				:href="subscribeLink"
				class="bg-white-100 px-6 py-4 text-xs font-semibold tracking-wide text-dark-100 duration-75 hover:text-red-100"
			>
				{{ t('shared.subscribe-now') }}
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconInbox from './components/icon-inbox-in.component.vue';
import IconBook from './components/icon-book-open.component.vue';

export interface SubscribeNewsletterProps {
	title?: string;
	subtitle?: string;
	subscribeLink?: string;
}

const { t } = useI18n();

const props = withDefaults(defineProps<SubscribeNewsletterProps>(), {
	title: `Subscribe To Our Newsletter`,
	subtitle: `Choose to stay up to date only on the topics that interest you most.`,
	subscribeLink: '/auth/register?subscribe=true',
});

const categories = [
	t('todays'),
	t('weekly'),
	t('private'),
	t('shared.professional'),
];
</script>
