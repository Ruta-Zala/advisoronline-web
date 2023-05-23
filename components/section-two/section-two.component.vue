<template>
	<div
		class="relative overflow-hidden py-5 pl-3 text-white-100 md:pl-10 md:pr-0"
	>
		<GetSwiper v-slot="{ swiper, onSwiper }">
			<img
				src="/images/event-blue.png"
				alt="img"
				class="absolute left-0 top-0 h-full w-full object-cover"
			/>
			<div class="relative">
				<BlockHeader :title="title" class="mb-4 mr-3 md:mr-10">
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</BlockHeader>
				<Swiper
					:space-between="20"
					:breakpoints="breakpoints"
					class="mb-4"
					@swiper="onSwiper"
				>
					<SwiperSlide v-for="slide in list" :key="slide.id">
						<slot v-bind="slide" />
					</SwiperSlide>
				</Swiper>
				<a
					:href="link.url"
					class="mr-4 block py-4 text-right text-xs font-medium tracking-wide md:mr-10"
					>{{ link.title }}</a
				>
			</div>
		</GetSwiper>
	</div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import Controls from '~/components/controls/controls.component.vue';

export interface SectionTwoProps {
	title: string;
	link: {
		title: string;
		url: string;
	};
	list: Array<{
		id: number | string;
		date: string;
		location: string;
		startingTime: string;
		endingTime: string;
		title: string;
		description?: string;
		writer: string;
		isSaved: boolean;
		image: string;
		showFrame: boolean;
		url: string;
	}>;
}

defineProps<SectionTwoProps>();

const breakpoints = {
	0: {
		slidesPerView: 1.2,
	},
	576: {
		slidesPerView: 1.8,
	},
	768: {
		slidesPerView: 2.2,
	},
	992: {
		slidesPerView: 2.8,
	},
	1200: {
		slidesPerView: 3.2,
	},
	1366: {
		slidesPerView: 3.4,
	},
};
</script>
