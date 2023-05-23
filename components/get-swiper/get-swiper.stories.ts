import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { faker } from '@faker-js/faker';
import Block from './get-swiper.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import CardThree from '~/components/card-three/card-three.component.vue';
import Controls from '~/components/controls/controls.component.vue';

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

export default {
	title: 'Utils / Get Swiper',
	component: Block,
	args: {
		title: 'ArmChairs view',
		list: Array.from({ length: 5 }, () => ({
			id: faker.datatype.uuid(),
			image: faker.image.abstract(),
			category: 'Consulenti Finanziari',
			title: `“Mettiamo al lavoro” i soldi dei clienti`,
			description:
				'Le ambizioni degli investitori includono sempre più spesso obiettivi sostenibili. E al centro di ',
			date: '04/04/2022',
			url: '#',
		})),
		sliderBreakpoints,
	},
} satisfies Meta;

const html = String.raw;

export const GetSwiper: StoryFn = (args) => {
	return defineComponent({
		components: {
			Block,
			Swiper,
			SwiperSlide,
			BlockHeader,
			CardThree,
			Controls,
		},
		setup: () => ({ args }),
		template: html`
			<Block v-slot="{swiper, onSwiper}">
				<BlockHeader :title="args.title" class="mb-4">
					<template #append>
						<Controls
							@controls-prev="swiper?.slidePrev()"
							@controls-next="swiper?.slideNext()"
						/>
					</template>
				</BlockHeader>

				<Swiper
					:space-between="20"
					:breakpoints="args.sliderBreakpoints"
					@swiper="onSwiper"
				>
					<SwiperSlide v-for="(item, index) in args.list" :key="index">
						<CardThree v-bind="item" />
					</SwiperSlide>
				</Swiper>
			</Block>
		`,
	});
};
