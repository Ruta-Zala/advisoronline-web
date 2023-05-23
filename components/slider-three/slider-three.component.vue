<template>
	<div class="border-b-2 border-red-100 pb-1">
		<div class="mb-4 flex items-center justify-between pb-1">
			<div class="flex gap-2 text-red-100">
				<component :is="icon" v-if="icon" class="h-4 w-4" />
				<p class="text-xs font-bold uppercase tracking-wide">
					{{ title }}
				</p>
			</div>
			<div class="mb-2 flex gap-4 self-end text-grey-100">
				<button @click="swiperControl?.slidePrev()">
					<ChevronLeft class="h-4 w-4" />
				</button>
				<button @click="swiperControl?.slideNext()">
					<ChevronRight class="h-4 w-4" />
				</button>
			</div>
		</div>
		<Swiper
			:space-between="20"
			:breakpoints="breakpoints"
			@swiper="swiperControl = $event"
		>
			<SwiperSlide v-for="slide in list" :key="slide.id">
				<slot v-bind="slide" />
			</SwiperSlide>
		</Swiper>
	</div>
</template>
<script lang="ts" setup>
import { type Component, ref } from 'vue';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ChevronLeft from '~/icons/icon-chevron-left.component.vue';
import ChevronRight from '~/icons/icon-chevron-right.component.vue';

export interface SliderThreeProps {
	title: string;
	icon?: Component;
	list: any;
	breakpoints: any;
}

defineProps<SliderThreeProps>();

const swiperControl = ref<SwiperClass>();
</script>
