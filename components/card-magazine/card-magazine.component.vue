<template>
	<div class="inline-block">
		<div
			class="group relative m-auto shadow-[20px_35px_50px_-15px_rgba(0,0,0,0.3),5px_5px_0_rgba(0,0,0,0.08)]"
			:class="{
				'mb-7 h-[384px] w-[281px]': size === 'big',
				'mb-5 h-[306px] w-[224px]': size === 'medium',
			}"
		>
			<a :href="magazineUrl">
				<img
					:src="image"
					class="absolute left-0 top-0 h-full w-full object-cover"
				/>
				<div
					class="absolute inset-0 flex items-center justify-center bg-dark-400/80 text-white-100 opacity-0 duration-150 group-hover:opacity-100"
				>
					<div
						:class="{
							'pb-12': size === 'big' && showSubscribe,
							'pb-14': size === 'medium' && showSubscribe,
						}"
					>
						<IconSearch class="m-auto mb-3 h-10 w-10" />
						<h5 class="font-serif text-lg tracking-wider">
							{{ t('magazines.view') }}
						</h5>
					</div>
				</div>
			</a>
			<button
				v-if="showSubscribe"
				class="absolute right-1/2 inline-block translate-x-1/2 bg-white-100 py-4 text-xs font-semibold uppercase tracking-wider text-dark-100 opacity-0 duration-150 hover:text-red-100 group-hover:opacity-100"
				:class="{
					'bottom-11 px-12': size === 'big',
					'bottom-8 px-12': size === 'medium',
				}"
			>
				{{ t('magazines.subscribe') }}
			</button>
		</div>
		<p
			class="text-center tracking-wide"
			:class="{
				'text-sm font-semibold': size === 'big',
				'text-[13px] font-medium': size === 'medium',
			}"
		>
			{{ name }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconSearch from '~/icons/icon-search.component.vue';

export interface CardMagazineProps {
	size: 'medium' | 'big';
	name: string;
	image: string;
	magazineUrl: string;
	showSubscribe?: boolean;
}

const { t } = useI18n();

defineProps<CardMagazineProps>();
</script>
