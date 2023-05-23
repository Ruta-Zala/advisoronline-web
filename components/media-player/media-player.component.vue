<template>
	<div
		ref="divRef"
		:data-plyr-provider="props.provider"
		:data-plyr-embed-id="props.id"
	/>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { VideoProvider } from '~/constants/video-provider';

export interface MediaPlayerProps {
	options?: Plyr.Options;
	hideYouTubeDOMError?: boolean;
	provider: VideoProvider;
	/** Can either be the video ID or URL for the media. */
	id: string;
}

const props = withDefaults(defineProps<MediaPlayerProps>(), {
	hideYouTubeDOMError: false,
	options: undefined,
});

const divRef = ref<HTMLDivElement>();
const player = ref<Plyr>();

onMounted(() => {
	if (!divRef.value) return;
	player.value = new Plyr(divRef.value, props.options);
});

onBeforeUnmount(() => {
	try {
		player.value?.destroy();
	} catch (error: any) {
		const isYtError =
			error.message === 'The YouTube player is not attached to the DOM.';

		if (props.hideYouTubeDOMError && isYtError) return;

		console.error(error);
	}
});
</script>
