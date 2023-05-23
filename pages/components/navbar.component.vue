<template>
	<Navbar
		:date="date"
		:subscribe-url="subscribeUrl"
		:magazine-url="magazineUrl"
		:signin-url="signinUrl"
		:categories="categories"
		:user="user"
		@toggle-sidebar="toggleSidebar(true)"
		@toggle-tags-modal="toggleTagsModal(true)"
		@toggle-search-modal="toggleSearchModal(true)"
		@sign-out="signOut"
	/>
</template>

<script lang="ts" setup>
import Navbar from '~/components/navbar/navbar.component.vue';
import { NavigationItem } from '~/types/graphql';

defineProps<{
	categories: NavigationItem[];
}>();

const { $globalSettings } = useNuxtApp();
const { magazineUrl, signinUrl, subscribeUrl, user, signOut } = $globalSettings;
const { toggleSidebar, toggleTagsModal, toggleSearchModal } = $globalSettings;

const dateFormat = useDateFormatter({ dateStyle: 'full' });
const date = dateFormat(new Date());
</script>
