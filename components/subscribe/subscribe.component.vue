<template>
	<div class="relative">
		<img
			src="/images/book-dark.png"
			alt="img"
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<div
			class="relative mx-5 flex flex-col items-center justify-between gap-x-7 gap-y-16 py-5 text-center text-white-100 sm:mx-10 sm:py-10 md:flex-row"
		>
			<div class="text-left">
				<h2 class="mb-5 font-serif text-[26px] font-medium tracking-wide">
					{{ title }}
				</h2>
				<p class="text-[13px] font-medium tracking-wide">
					{{ description }}
				</p>
			</div>
			<div class="w-full bg-red-100 px-4 py-7 sm:px-7 md:w-96">
				<p class="mb-2 text-sm font-medium tracking-wide">
					{{ t('subscribe.full-access') }}
				</p>
				<i18n-t
					tag="h2"
					keypath="subscribe.price-per-year"
					class="mb-5 font-serif text-[36px] font-semibold sm:whitespace-nowrap"
				>
					<span>{{ t('subscribe.price-per-year.0', { price }) }}</span>
					<span>{{ t('subscribe.price-per-year.1') }}</span>
				</i18n-t>
				<a
					:href="link"
					class="block bg-white-100 py-5 text-xs font-bold tracking-wide text-dark-100 duration-75 hover:text-red-100"
				>
					{{ t('shared.subscribe-now') }}
				</a>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

export interface SubscribeProps {
	title: string;
	description: string;
	price: number;
	link: string;
}

const { t } = useI18n();

defineProps<SubscribeProps>();
</script>
