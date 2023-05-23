<template>
	<div
		class="relative my-12 flex flex-col items-center justify-center bg-dark-100 p-5 py-12 text-center text-white-100 md:px-12"
	>
		<component :is="icon" class="mb-6 h-20 w-20" />
		<h2 class="font-serif text-[26px] font-bold tracking-wide">
			{{ title }}
		</h2>
		<hr class="my-4 w-20" />
		<Markup
			class="mb-5 text-[13px] font-semibold leading-7 tracking-wide"
			:html="description"
		/>
		<ul class="mb-8 list-disc text-left text-[13px]">
			<li v-for="(offer, index) in offers" :key="index">
				{{ offer }}
			</li>
		</ul>
		<a
			href="/auth/login"
			class="block border bg-white-100 px-8 py-4 text-xs font-medium uppercase tracking-wider text-dark-100"
			>{{ loginText }}</a
		>
	</div>
</template>
<script lang="ts" setup>
import { type Component } from 'vue';
import Markup from '~/components/markup/markup.component.vue';

export interface UserOfferProps {
	icon: Component;
	title: string;
	description: string;
	offers: Array<string>;
	loginText: string;
}

defineProps<UserOfferProps>();
</script>
