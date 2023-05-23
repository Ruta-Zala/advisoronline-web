<template>
	<div class="relative">
		<img
			:src="image"
			alt=""
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<div class="relative bg-dark-400/80 px-2.5 pb-8 text-white-100 sm:px-8">
			<div class="relative h-128 py-10">
				<iframe
					v-if="clicked"
					class="m-auto h-full w-full"
					:src="autoPlayURL(video.url)"
					allowfullscreen
					allow="autoplay"
				/>
				<button
					:class="{ 'pointer-events-none opacity-0': clicked }"
					class="absolute inset-0 w-full duration-300"
					@click="clicked = true"
				>
					<p
						class="inline bg-white-100 px-2.5 py-1.5 text-[13px] font-medium text-dark-100"
					>
						{{ category }}
					</p>
					<h2
						class="my-4 font-serif text-3xl font-medium tracking-wide lg:text-4xl"
					>
						{{ video.title }}
					</h2>
					<p class="mb-6 text-[13px] font-medium">
						{{ video.date }}
						<span v-if="video.author"> | {{ video.author }}</span>
					</p>
					<IconPlayCircle class="m-auto h-[64px] w-[64px] stroke-2" />
				</button>
			</div>
			<GetSwiper v-slot="{ swiper, onSwiper }">
				<BlockHeader :title="slider.title" class="mb-4">
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</BlockHeader>
				<Swiper
					:breakpoints="sliderBreakpoints"
					:space-between="20"
					@swiper="onSwiper"
				>
					<SwiperSlide v-for="(slide, index) in slider.list" :key="index">
						<slot v-bind="slide" />
					</SwiperSlide>
				</Swiper>
			</GetSwiper>
			<a
				:href="link.url"
				class="flex items-center justify-end gap-2 px-4 pt-12"
			>
				<p class="text-xs font-medium">{{ link.text }}</p>
				<IconPlay class="h-5 w-5 shrink-0" />
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import Controls from '~/components/controls/controls.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import IconPlayCircle from '~/icons/icon-play-circle.component.vue';
import IconPlay from '~/icons/icon-play.component.vue';
import { autoPlayURL } from '~/utils/autoplay-url';

export interface SectionThreeProps {
	category: string;
	image: string;
	video: {
		title: string;
		url: string;
		date: string;
		author?: string;
	};
	slider: {
		title: string;
		list: Array<any>;
	};
	link: {
		text: string;
		url: string;
	};
}

defineProps<SectionThreeProps>();

const clicked = ref(false);

const sliderBreakpoints = {
	0: {
		slidesPerView: 1.2,
	},
	576: {
		slidesPerView: 1.8,
	},
	768: {
		slidesPerView: 2.8,
	},
	992: {
		slidesPerView: 3.2,
	},
	1200: {
		slidesPerView: 3.2,
	},
	1366: {
		slidesPerView: 4.2,
	},
};
</script>
