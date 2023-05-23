<template>
	<transition
		enter-active-class="transition duration-100 ease-out"
		enter-from-class="transform opacity-0"
		enter-to-class="transform"
		leave-active-class="transition duration-75 ease-out"
		leave-from-class="transform"
		leave-to-class="transform opacity-0"
	>
		<NavbarFull
			v-if="!compact"
			class="fixed inset-x-0 top-0 z-10"
			:date="date"
			:subscribe-url="subscribeUrl"
			:signin-url="signinUrl"
			:categories="categories"
			:user="user"
			:active-category="activeCategory"
			@set-active-category="setActiveCategory"
			@remove-active-category="removeActiveCategory"
			@toggle-sidebar="$emit('toggleSidebar')"
			@toggle-tags-modal="$emit('toggleTagsModal')"
			@toggle-search-modal="$emit('toggleSearchModal')"
			@sign-out="$emit('sign-out')"
		/>
	</transition>
	<transition
		enter-active-class="transition duration-100 ease-out"
		enter-from-class="transform opacity-0"
		enter-to-class="transform"
		leave-active-class="transition duration-75 ease-out"
		leave-from-class="transform"
		leave-to-class="transform opacity-0"
	>
		<NavbarCompact
			v-if="compact"
			class="fixed inset-x-0 top-0 z-10"
			:subscribe-url="subscribeUrl"
			:signin-url="signinUrl"
			:categories="categories"
			:user="user"
			:active-category="activeCategory"
			@set-active-category="setActiveCategory"
			@remove-active-category="removeActiveCategory"
			@toggle-sidebar="$emit('toggleSidebar')"
			@toggle-tags-modal="$emit('toggleTagsModal')"
			@toggle-search-modal="$emit('toggleSearchModal')"
			@sign-out="$emit('sign-out')"
		/>
	</transition>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import { useHasScrolled } from '~/composables/use-has-scrolled';
import NavbarFull from './components/navbar-full.component.vue';
import NavbarCompact from './components/navbar-compact.component.vue';
import { NavigationItem } from '~/types/graphql';

export interface NavbarProps {
	date: string;
	subscribeUrl: string;
	magazineUrl: string;
	signinUrl: string;
	categories: NavigationItem[];
	user?: {
		name: string;
		picture?: string;
	};
}

defineProps<NavbarProps>();
defineEmits([
	'toggleTagsModal',
	'toggleSearchModal',
	'toggleSidebar',
	'sign-out',
]);

const activeCategory = shallowRef<NavigationItem>();
const compact = useHasScrolled();

function removeActiveCategory() {
	activeCategory.value = undefined;
}

function setActiveCategory(category: NavigationItem) {
	if (category.items) {
		activeCategory.value = category;
	}
	if (!category.items && activeCategory) {
		activeCategory.value = undefined;
	}
}
</script>
