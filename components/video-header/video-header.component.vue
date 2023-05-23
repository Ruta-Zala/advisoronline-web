<template>
	<div class="relative h-72 text-white-100 sm:aspect-[1366/610] sm:h-auto">
		<MediaPlayer
			v-if="clicked"
			:id="props.url"
			:provider="props.provider"
			:options="{ autoplay: true }"
		/>
		<button
			:class="{ 'pointer-events-none opacity-0': clicked }"
			class="absolute inset-0 w-full duration-300"
			@click="clicked = true"
		>
			<img
				:src="props.thumbnail"
				alt="img"
				class="absolute left-0 top-0 h-full w-full object-cover"
			/>
			<div
				class="absolute inset-0 flex flex-col items-center justify-center bg-dark-400/80 text-center"
			>
				<span
					class="mb-4 bg-grey-200 px-2 py-1.5 text-sm font-medium uppercase tracking-wide text-dark-200"
				>
					{{ props.tag }}
				</span>

				<h2
					class="mx-4 mb-3 line-clamp-3 max-w-md font-serif text-2xl font-semibold tracking-wide sm:mb-5 sm:line-clamp-4 sm:text-3xl lg:text-4xl"
				>
					{{ props.title }}
				</h2>

				<p class="mb-4 text-xs font-medium tracking-wide sm:mb-6">
					{{ props.date }} <span v-if="author"> | {{ author }}</span>
				</p>
				<IconPlayCircle class="h-10 w-10 sm:h-16 sm:w-16" />
			</div>
		</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconPlayCircle from '~/icons/icon-play-circle.component.vue';
import MediaPlayer from '../media-player/media-player.component.vue';
import { VideoProvider } from '~/constants/video-provider';

export interface VideoHeaderProps {
	url: string;
	provider: VideoProvider;
	title: string;
	date: string;
	author?: string;
	tag: string;
	thumbnail: string;
}

const props = defineProps<VideoHeaderProps>();
const clicked = ref(false);
</script>
