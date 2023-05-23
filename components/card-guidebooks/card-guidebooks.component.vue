<template>
	<div
		:class="{ 'bg-dark-100 text-white-100': dark, 'bg-white-100': !dark }"
		class="flex flex-col items-center border border-grey-100 px-5 pb-8 pt-5 md:px-8"
	>
		<img src="../../assets/guidebook-group.png" alt="img" />

		<i18n-t
			keypath="guidebooks.header.head"
			tag="h2"
			class="mb-8 text-center font-serif text-[26px] font-bold"
		>
			<span class="font-normal">{{ t('guidebooks.header.tail') }}</span>
		</i18n-t>
		<hr class="mb-16 w-20 border-red-100" />
		<div class="mb-2 w-full">
			<div v-if="guidebooks" class="divide-y divide-grey-100">
				<a
					v-for="(item, index) in guidebooks"
					:key="index"
					:href="item.link"
					class="mb-4 block pt-3.5 font-serif text-[20px] duration-75 first:pt-0 hover:text-red-100"
					>{{ item.text }}</a
				>
			</div>
			<p v-if="description" class="mb-6 text-sm tracking-wider">
				{{ description }}
			</p>
		</div>
		<button
			v-if="buttonSize === 'big'"
			:class="{
				'bg-red-100 hover:bg-red-200': dark,
				'bg-dark-100 hover:bg-red-100': !dark,
			}"
			class="w-full bg-dark-100 py-4 text-xs font-medium tracking-wider text-white-100 duration-75 hover:bg-red-100"
		>
			{{ t('guidebooks.discover') }}
		</button>
		<a
			v-if="false && buttonSize === 'small'"
			href="#"
			class="self-end text-xs font-semibold duration-75 hover:text-red-100"
		>
			{{ t('shared.view-all-new') }}
		</a>
	</div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

export interface CardGuidebooksProps {
	dark?: boolean;
	buttonSize: 'small' | 'big';
	description?: string;
}

const { t } = useI18n();

const guidebooks = [
	{
		text: t('guidebooks.fixed-income'),
		link: '#',
	},
	{
		text: t('guidebooks.equity-europe'),
		link: '#',
	},
	{
		text: t('guidebooks.stable-strategy'),
		link: '#',
	},
	{
		text: t('guidebooks.flessible'),
		link: '#',
	},
	{
		text: t('guidebooks.short-bond'),
		link: '#',
	},
];

defineProps<CardGuidebooksProps>();
</script>
