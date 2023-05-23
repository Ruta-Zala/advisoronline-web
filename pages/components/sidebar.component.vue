<template>
	<Sidebar
		:subscribe-url="subscribeUrl"
		:magazine-url="magazineUrl"
		:signin-url="signinUrl"
		:categories="categories"
		:user="user"
		:is-sidebar-open="isSidebarOpen"
		@toggle-sidebar="toggleSidebar(false)"
		@toggle-tags-modal="toggleTagsModal(true)"
		@toggle-search-modal="toggleSearchModal(true)"
		@sign-out="signOut"
	/>
</template>

<script lang="ts" setup>
import Sidebar from '~/components/sidebar/sidebar.component.vue';
import { NavigationItem } from '~/types/graphql';

defineProps<{
	categories: NavigationItem[];
}>();

const { $globalSettings } = useNuxtApp();
const { magazineUrl, signinUrl, subscribeUrl, isSidebarOpen } = $globalSettings;
const { toggleSidebar, toggleTagsModal, toggleSearchModal } = $globalSettings;
const { user, signOut } = $globalSettings;
</script>
