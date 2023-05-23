<template>
	<TagsModal v-model="isTagsModalOpen" />
	<SearchModal v-model="isSearchModalOpen" />
</template>

<script lang="ts" setup>
import TagsModal from '~/pages/components/tags-modal.component.vue';
import SearchModal from '~/pages/components/search-modal.component.vue';

const { $globalSettings } = useNuxtApp();
const { isSearchModalOpen, isTagsModalOpen } = $globalSettings;
</script>
