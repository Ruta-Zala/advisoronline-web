<template>
	<div>
		<SidebarFull
			class="hidden sm:block"
			:subscribe-url="subscribeUrl"
			:magazine-url="magazineUrl"
			:signin-url="signinUrl"
			:categories="categories"
			:user="user"
			:is-sidebar-open="isSidebarOpen"
			@toggle-sidebar="$emit('toggleSidebar')"
			@toggle-tags-modal="$emit('toggleTagsModal')"
			@toggle-search-modal="$emit('toggleSearchModal')"
			@sign-out="$emit('sign-out')"
		/>
		<SidebarCompact
			class="block sm:hidden"
			:subscribe-url="subscribeUrl"
			:magazine-url="magazineUrl"
			:signin-url="signinUrl"
			:categories="categories"
			:user="user"
			:is-sidebar-open="isSidebarOpen"
			@toggle-sidebar="$emit('toggleSidebar')"
			@toggle-tags-modal="$emit('toggleTagsModal')"
			@toggle-search-modal="$emit('toggleSearchModal')"
			@sign-out="$emit('sign-out')"
		/>
	</div>
</template>

<script lang="ts" setup>
import SidebarFull from './components/sidebar-full.component.vue';
import SidebarCompact from './components/sidebar-compact.component.vue';
import { NavigationItem } from '~/types/graphql';

export interface SidebarProps {
	isSidebarOpen: boolean;
	subscribeUrl: string;
	magazineUrl: string;
	signinUrl: string;
	categories: NavigationItem[];
	user?: {
		name: string;
		picture?: string;
	};
}

defineProps<SidebarProps>();
defineEmits([
	'toggleTagsModal',
	'toggleSearchModal',
	'toggleSidebar',
	'sign-out',
]);
</script>
