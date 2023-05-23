<template>
	<GetSwiper v-slot="{ swiper, onSwiper }">
		<BlockHeader
			:title="title"
			:logo="logo"
			logo-on-top
			class="mb-4"
			:bold-full="boldFull"
		>
			<template #append>
				<Controls
					@controls-prev="swiper?.slidePrev()"
					@controls-next="swiper?.slideNext()"
				/>
			</template>
		</BlockHeader>
		<Swiper @swiper="onSwiper">
			<SwiperSlide
				v-for="(chunkPart, chunkIndex) in chunk(list, 3)"
				:key="chunkIndex"
				class="space-y-5 md:space-y-3"
			>
				<CardTwo
					v-for="(item, index) in chunkPart"
					v-bind="item"
					:key="index"
					class="border-b border-grey-100 pb-4 last:border-0 md:pb-2"
				/>
			</SwiperSlide>
		</Swiper>
		<a
			v-if="false"
			:href="viewMoreUrl"
			class="mt-3 block text-right text-xs font-semibold"
		>
			{{ t('shared.view-more') }}
		</a>
	</GetSwiper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { chunk } from '~/utils/chunk';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import GetSwiper from '~/components/get-swiper/get-swiper.component.vue';
import CardTwo from '~/components/card-two/card-two.component.vue';
import Controls from '~/components/controls/controls.component.vue';

export interface SliderTwoProps {
	title: string;
	boldFull?: boolean;
	logo?: string;
	list: Array<{
		image?: string;
		imageSize: 'small' | 'medium';
		title: string;
		category: string;
		url: string;
	}>;
	viewMoreUrl: string;
}

const { t } = useI18n();

defineProps<SliderTwoProps>();
</script>
