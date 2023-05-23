<template>
	<div>
		<component
			:is="link.tag"
			v-for="link in userLinks"
			:key="link.name"
			class="block w-full px-5 py-3 text-left text-sm font-semibold tracking-wide duration-75 hover:bg-red-100 hover:text-white-100 sm:py-3.5"
			:href="link.tag === 'a' ? link.to : undefined"
			@click="link.tag === 'button' ? $emit(link.to as 'sign-out') : undefined"
		>
			{{ link.name }}
		</component>
	</div>
</template>

<script lang="ts" setup>
defineEmits<{ (e: 'sign-out'): void }>();

type MenuItem = {
	name: string;
	to: string;
	tag: 'a' | 'button';
};

const userLinks: MenuItem[] = [
	{
		name: 'Account',
		to: '/user',
		tag: 'a',
	},
	{
		name: 'Email Settings',
		to: '/user/preferences',
		tag: 'a',
	},
	{
		name: 'Bookmarks',
		to: '/user/bookmarked-articles',
		tag: 'a',
	},
	{
		name: 'Following',
		to: '#',
		tag: 'a',
	},
	{
		name: 'My Magazines',
		to: '/user/magazines',
		tag: 'a',
	},
	{
		name: 'My Subscriptions',
		to: '/user/subscription',
		tag: 'a',
	},
	{
		name: 'Help',
		to: '/user/help-center',
		tag: 'a',
	},
	{
		name: 'Sign out',
		to: 'sign-out',
		tag: 'button',
	},
];
</script>
