<template>
	<div
		class="w-full bg-white-100 shadow-lg shadow-blue-100/10 lg:shadow-none"
		@mouseleave="$emit('removeActiveCategory')"
	>
		<div class="flex justify-center">
			<div
				class="flex w-full max-w-[1920px] items-center justify-between p-2 md:px-7 xl:px-10"
			>
				<div class="class flex lg:w-full">
					<button @click="$emit('toggleSidebar')">
						<IconMenuAlt2
							class="h-6 w-6 text-red-100 duration-75 hover:text-red-200"
						/>
					</button>
					<p class="ml-5 hidden text-sm font-semibold tracking-wide lg:block">
						{{ date }}
					</p>
					<IconCalendar
						class="ml-2.5 hidden h-5 w-5 text-dark-100/60 lg:block"
					/>
				</div>
				<a href="/" class="hidden shrink-0 lg:block">
					<AdvisorLogo class="h-7" />
				</a>
				<div class="flex items-center justify-end gap-6 uppercase lg:w-full">
					<button
						class="block h-6 w-6 hover:text-red-100 lg:hidden"
						@click="$emit('toggleSearchModal')"
					>
						<IconSearch class="m-auto h-4 w-4 duration-75" />
					</button>
					<a
						v-if="!user"
						:href="subscribeUrl"
						class="hidden items-center text-red-100 duration-75 hover:text-red-200 sm:flex"
					>
						<p class="text-xs font-semibold tracking-wide">
							{{ t('shared.subscribe') }}
						</p>
						<IconMailOpen class="ml-2 h-5 w-5" />
					</a>
					<a
						v-if="!user"
						:href="signinUrl"
						class="flex items-center bg-red-100 px-6 py-3 text-white-100 duration-75 hover:bg-red-200"
					>
						<p class="text-xs font-medium tracking-wide">
							{{ t('shared.sign-in') }}
						</p>
						<IconUserCircle class="ml-2 h-5 w-5" />
					</a>
					<UserMenu v-if="user" :user="user" @sign-out="$emit('sign-out')" />
				</div>
			</div>
		</div>
		<div class="hidden lg:block">
			<div
				class="relative flex justify-center border-t border-red-100 duration-150"
			>
				<div
					class="flex w-full max-w-[1920px] justify-between px-7 py-4 shadow-lg shadow-blue-100/10 xl:px-10"
				>
					<div class="mr-7 flex items-center gap-10 overflow-x-auto">
						<template v-for="category in categories" :key="category.title">
							<a
								v-if="category.path"
								:class="[
									`whitespace-nowrap text-xs font-semibold uppercase tracking-wide`,
									`before:absolute before:top-full before:h-0.5 before:bg-red-100 before:duration-75 before:content-[''] hover:before:w-full`,
									`relative duration-75 hover:text-red-100`,
									{
										'text-red-100 before:w-full': category === activeCategory,
										'before:w-0': category !== activeCategory,
									},
								]"
								:href="category.path"
								@mouseenter="$emit('setActiveCategory', category)"
							>
								{{ category.title }}
							</a>
						</template>
					</div>
					<div class="flex gap-10">
						<button
							class="h-6 w-6 hover:text-red-100"
							@click="$emit('toggleSearchModal')"
						>
							<IconSearch class="m-auto h-[18px] w-[18px] duration-75" />
						</button>
						<button
							v-if="false"
							class="flex h-6 items-center gap-3 duration-75 hover:text-red-100"
							@click="$emit('toggleTagsModal')"
						>
							<span class="text-sm font-semibold">{{ t('shared.tags') }}</span>
							<IconTag class="h-4 w-4" />
						</button>
						<button
							class="flex h-6 items-center gap-3 duration-75 hover:text-red-100"
						>
							<span class="text-sm font-semibold">
								{{ t('shared.magazine') }}
							</span>
							<IconNewspaper class="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform opacity-0"
				enter-to-class="transform"
				leave-active-class="transition duration-75 ease-out"
				leave-from-class="transform"
				leave-to-class="transform opacity-0"
			>
				<div
					v-if="activeCategory?.items?.length"
					class="flex w-full justify-center bg-white-100 shadow-[inset_0_10px_15px_rgba(0,100,212,0.1)]"
				>
					<div
						class="flex w-full max-w-[1920px] items-center gap-10 px-7 py-4 xl:px-10"
					>
						<template
							v-for="(link, index) in activeCategory.items"
							:key="index"
						>
							<a
								v-if="link?.path"
								class="relative py-1 text-xs font-semibold uppercase tracking-wide before:absolute before:left-0 before:top-full before:h-0.5 before:w-0 before:bg-red-100 before:duration-75 before:content-[''] hover:text-red-100 hover:before:w-full"
								:href="link.path"
							>
								{{ link.title }}
							</a>
						</template>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import UserMenu from './user-menu.component.vue';
import IconMenuAlt2 from '~/icons/icon-menu-alt-2.component.vue';
import IconCalendar from '~/icons/icon-calendar.component.vue';
import IconUserCircle from '~/icons/icon-user-circle.component.vue';
import AdvisorLogo from '~/assets/advisor-logo.component.vue';
import IconSearch from '~/icons/icon-search.component.vue';
import IconTag from '~/icons/icon-tag.component.vue';
import IconNewspaper from '~/icons/icon-newspaper.component.vue';
import IconMailOpen from '~/icons/icon-mail-open.component.vue';
import { NavigationItem } from '~/types/graphql';

defineProps<{
	date: string;
	subscribeUrl: string;
	signinUrl: string;
	categories: NavigationItem[];
	activeCategory?: NavigationItem;
	user?: {
		name: string;
		picture?: string;
	};
}>();

defineEmits([
	'toggleTagsModal',
	'toggleSearchModal',
	'toggleSidebar',
	'setActiveCategory',
	'removeActiveCategory',
	'sign-out',
]);

const { t } = useI18n();
</script>
