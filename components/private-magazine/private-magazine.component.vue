<template>
	<div class="relative pb-8 pt-10">
		<img
			src="/images/book-dark.png"
			alt="img"
			class="absolute -top-10 left-0 h-full w-full object-cover"
		/>
		<div class="container w-full lg:w-2/3">
			<div
				class="relative mx-10 flex flex-col items-center text-center text-white-100"
			>
				<IconBook class="h-14 w-14" />
				<h3 class="my-8 font-serif text-[34px] font-semibold tracking-wide">
					{{ title }}
				</h3>

				<p class="mb-5 font-serif text-[26px] font-normal tracking-wider">
					{{ description }}
				</p>
				<hr class="w-20 border-white-100" />
				<p class="my-6 text-sm">{{ shortDescription }}</p>
				<div class="mb-10 flex flex-wrap items-center justify-center gap-y-5">
					<div
						v-for="(item, index) in props.categories"
						:key="index"
						class="flex gap-3 border-r border-grey-100/80 px-4 last:border-none md:px-8"
					>
						<component :is="item.icon" class="h-5 w-5" />
						<p class="text-sm font-medium tracking-wide">{{ item.name }}</p>
					</div>
				</div>
				<div
					class="relative -mb-48 mt-8 flex items-center gap-12 text-dark-100"
				>
					<div>
						<img
							:src="image1.image"
							class="mb-4 h-[278px] w-[205px] drop-shadow-subscription"
						/>
						<span>{{ image1.text }}</span>
					</div>
					<div>
						<img
							:src="image2.image"
							class="mb-4 h-[412px] w-[281px] drop-shadow-subscription"
						/>
						<span>{{ image2.text }}</span>
					</div>
					<div>
						<img
							:src="image3.image"
							class="mb-4 h-[278px] w-[205px] drop-shadow-subscription"
						/>
						<span>{{ image3.text }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { type Component } from 'vue';
import IconBook from '~/components/subscribe-newsletter/components/icon-book-open.component.vue';

export interface PrivateMagazineProps {
	title: string;
	description: string;
	shortDescription: string;
	image1: { text: string; image: string };
	image2: { text: string; image: string };
	image3: { text: string; image: string };
	categories: Array<{
		name: string;
		icon: Component;
	}>;
}

const props = defineProps<PrivateMagazineProps>();
</script>
