<template>
	<slot v-bind="{ swiper: _swiper, onSwiper }" />
</template>

<script lang="ts" setup>
import { Swiper } from 'swiper';
import { ref } from 'vue';

const emit = defineEmits<{
	(e: 'swiper', swiper: Swiper): void;
}>();

const _swiper = ref<Swiper>();

function onSwiper(swiper: Swiper): void {
	_swiper.value = swiper;
	emit('swiper', swiper);
}
</script>
