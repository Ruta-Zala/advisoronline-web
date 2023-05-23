<template>
	<Menu as="div" class="relative z-10">
		<MenuButton
			as="button"
			class="flex items-center bg-red-100 px-6 py-3 text-white-100 duration-75 hover:bg-red-200"
		>
			<span
				class="whitespace-nowrap text-xs font-medium uppercase tracking-wide"
			>
				{{ user.name }}
			</span>
			<img
				v-if="user.picture"
				:src="user.picture"
				class="ml-2 h-5 w-5 rounded-full"
			/>
			<IconUserCircle v-else class="ml-2 h-5 w-5" />
		</MenuButton>
		<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-out"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0"
		>
			<MenuItems
				as="div"
				class="absolute right-0 top-full divide-y divide-grey-100 bg-white-100 px-7 shadow-lg shadow-blue-100/10"
			>
				<div v-for="(group, index) in userLinksGroups" :key="index">
					<MenuItem v-for="link in group" :key="link.name" as="div">
						<component
							:is="link.tag"
							class="flex w-full items-center gap-2.5 whitespace-nowrap py-4 duration-75 hover:text-red-100"
							:href="link.tag === 'a' ? link.to : undefined"
							@click="link.tag === 'button' ? $emit(link.to) : undefined"
						>
							<component :is="link.icon" class="h-5 w-5 fill-white-100" />
							<span class="text-xs font-semibold tracking-wide">
								{{ link.name }}
							</span>
						</component>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import IconUserCircle from '~/icons/icon-user-circle.component.vue';
import IconMail from '~/icons/icon-mail.component.vue';
import IconBookmark from '~/icons/icon-bookmark.component.vue';
import IconHeart from '~/icons/icon-heart.component.vue';
import IconBookOpen from '~/icons/icon-book-open.component.vue';
import IconCreditCard from '~/icons/icon-credit-card.component.vue';
import IconHelpCircle from '~/icons/icon-help-circle.component.vue';
import IconLogOut from '~/icons/icon-log-out.component.vue';

defineEmits<{ (e: 'sign-out'): void }>();
defineProps<{
	user: {
		name: string;
		picture?: string;
	};
}>();

type MenuItem = {
	name: string;
	icon: Component;
	to: string;
	tag: 'a' | 'button';
};

const userLinksGroups: MenuItem[][] = [
	[
		{
			name: 'Account',
			icon: IconUserCircle,
			to: '/user',
			tag: 'a',
		},
		{
			name: 'Email Settings',
			icon: IconMail,
			to: '/user/preferences',
			tag: 'a',
		},
	],
	[
		{
			name: 'Bookmarks',
			icon: IconBookmark,
			to: '/user/bookmarked-articles',
			tag: 'a',
		},
		{
			name: 'Following',
			icon: IconHeart,
			to: '#',
			tag: 'a',
		},
		{
			name: 'My Magazines',
			icon: IconBookOpen,
			to: '/user/magazines',
			tag: 'a',
		},
		{
			name: 'My Subscriptions',
			icon: IconCreditCard,
			to: '/user/subscription',
			tag: 'a',
		},
		{
			name: 'Help',
			icon: IconHelpCircle,
			to: '/user/help-center',
			tag: 'a',
		},
		{
			name: 'Sign out',
			icon: IconLogOut,
			to: 'sign-out',
			tag: 'button',
		},
	],
];
</script>
