<template>
	<transition
		enter-active-class="transition duration-200 ease-out"
		enter-from-class="transform opacity-0 -translate-x-full"
		enter-to-class="transform -translate-x-0"
		leave-active-class="transition duration-300 ease-out"
		leave-from-class="transform -translate-x-0"
		leave-to-class="transform opacity-0 -translate-x-full"
	>
		<div
			v-if="isSidebarOpen"
			class="fixed inset-0 z-20 w-[190vw] bg-gradient-to-r from-dark-400/70 via-dark-400/70"
			@click="$emit('toggleSidebar')"
		>
			<div
				class="absolute left-0 top-0 h-full bg-white-100"
				@click="(e) => e.stopPropagation()"
			>
				<transition
					enter-active-class="transition duration-100 ease-out"
					enter-from-class="transform -translate-x-full"
					enter-to-class="transform -translate-x-0"
					leave-active-class="transition duration-100 ease-out"
					leave-from-class="transform -translate-x-0"
					leave-to-class="transform -translate-x-full"
				>
					<div
						v-if="activeCategory?.items?.length || userMenuOpen"
						class="absolute left-full top-0 h-full w-full bg-white-100"
					>
						<div v-if="activeCategory?.items">
							<a
								class="block w-full border-b border-grey-100 px-5 py-4 text-left font-serif text-lg font-bold tracking-wide duration-75 hover:bg-red-100 hover:text-white-100"
								:href="activeCategory.path ?? undefined"
							>
								{{ activeCategory?.title }}
							</a>
							<template
								v-for="link in activeCategory?.items ?? []"
								:key="link.title"
							>
								<a
									v-if="link?.path"
									class="block w-full px-5 py-3.5 text-left text-sm font-semibold tracking-wide duration-75 hover:bg-red-100 hover:text-white-100"
									:href="link.path"
								>
									{{ link.title }}
								</a>
							</template>
						</div>
						<SidebarUserMenu v-if="userMenuOpen" @sign-out="signOut" />
					</div>
				</transition>
				<div
					class="relative flex h-full flex-col justify-between bg-white-100 shadow-[0_0_60px_-15px_rgba(0,100,212,0.3)]"
				>
					<div>
						<div
							class="flex items-center gap-5 border-b border-grey-100 px-5 py-4 text-red-100"
						>
							<a href="/">
								<AdvisorLogo class="h-7" />
							</a>
							<button @click="$emit('toggleSidebar')">
								<IconClose class="h-4 w-4 text-grey-100" />
							</button>
						</div>
						<button
							class="flex w-full items-center gap-3 bg-grey-200 px-5 py-3.5"
							@click="$emit('toggleSearchModal')"
						>
							<IconSearch class="h-5 w-5" />
							<span class="text-sm font-semibold">Search</span>
						</button>
						<div class="border-b border-grey-100">
							<component
								:is="category.items?.length ? 'button' : 'a'"
								v-for="category in categories"
								:key="category.title"
								class="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold tracking-wide duration-75 hover:bg-red-100 hover:text-white-100"
								:class="{
									'bg-red-100 text-white-100': category === activeCategory,
								}"
								:href="category.items?.length ? undefined : category.path"
								@click="handleClickCategory(category)"
							>
								{{ category.title }}
								<IconChevronRight
									v-if="category.items?.length"
									class="h-3 w-3"
								/>
							</component>
						</div>
						<div class="border-b border-grey-100">
							<a
								:href="magazineUrl"
								class="block w-full px-5 py-3.5 text-left text-sm font-semibold tracking-wide duration-75 hover:bg-red-100 hover:text-white-100"
							>
								Magazine
							</a>
							<button
								v-if="false"
								class="block w-full px-5 py-3.5 text-left text-sm font-semibold tracking-wide duration-75 hover:bg-red-100 hover:text-white-100"
								@click="$emit('toggleTagsModal')"
							>
								Tags
							</button>
							<a
								:href="subscribeUrl"
								class="block w-full px-5 py-3.5 text-left text-sm font-semibold tracking-wide duration-75 hover:bg-red-100 hover:text-white-100"
							>
								Newsletter
							</a>
						</div>
					</div>
					<div>
						<a
							v-if="!user"
							:href="signinUrl"
							class="flex w-full items-center justify-center gap-2 bg-red-100 py-3.5 text-white-100 duration-75 hover:bg-red-200"
						>
							<h3 class="text-xs uppercase tracking-wide">
								{{ t('shared.sign-in-login') }}
							</h3>
							<IconUserCircle class="h-5 w-5" />
						</a>
						<button
							v-if="user"
							class="flex w-full items-center justify-between gap-2 bg-red-100 px-5 py-3.5 text-white-100 duration-75 hover:bg-red-200"
							@click="toggleAccountMenu"
						>
							<h3 class="text-xs uppercase tracking-wide">My account</h3>
							<IconChevronRight class="h-3 w-3" />
						</button>
						<div class="bg mx-5 flex flex-wrap justify-between gap-2 py-3.5">
							<a
								v-for="social in socials"
								:key="social.url"
								:href="social.url"
								target="_blank"
								rel="noopener"
							>
								<component
									:is="social.icon"
									class="h-5 w-5 duration-75 hover:text-red-100"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import AdvisorLogo from '~/assets/advisor-logo.component.vue';
import IconClose from '~/icons/icon-close.component.vue';
import IconSearch from '~/icons/icon-search.component.vue';
import IconChevronRight from '~/icons/icon-chevron-right.component.vue';
import IconUserCircle from '~/icons/icon-user-circle.component.vue';
import { socials } from '~/utils/socials';
import SidebarUserMenu from './sidebar-user-menu.component.vue';
import { NavigationItem } from '~/types/graphql';

defineProps<{
	isSidebarOpen: boolean;
	subscribeUrl: string;
	magazineUrl: string;
	signinUrl: string;
	categories: NavigationItem[];
	user?: {
		name: string;
		picture?: string;
	};
}>();

const emit = defineEmits([
	'toggleTagsModal',
	'toggleSearchModal',
	'toggleSidebar',
	'sign-out',
]);

const { t } = useI18n();

const activeCategory = shallowRef<NavigationItem>();
const userMenuOpen = ref(false);

function handleClickCategory(category: NavigationItem) {
	if ((category.items?.length ?? 0) === 0) return;

	userMenuOpen.value = false;
	if (category.items) {
		if (category === activeCategory.value) {
			activeCategory.value = undefined;
		} else {
			activeCategory.value = category;
		}
	}
}

function toggleAccountMenu() {
	activeCategory.value = undefined;
	userMenuOpen.value = !userMenuOpen.value;
}

function signOut() {
	toggleAccountMenu();
	emit('sign-out');
	emit('toggleSidebar');
}
</script>
