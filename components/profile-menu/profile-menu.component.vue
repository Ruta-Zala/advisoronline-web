<template>
	<ul class="text-xs font-semibold">
		<li v-for="(profileLinksGroup, index) in profileLinksGroups" :key="index">
			<h1 class="my-4 text-center uppercase text-grey-100 lg:text-left">
				{{ profileLinksGroup.category }}
			</h1>
			<ul class="flex flex-wrap justify-center gap-4 lg:block">
				<li
					v-for="(item, itemIndex) in profileLinksGroup.items"
					:key="itemIndex"
				>
					<NuxtLink
						:to="item.slug"
						class="flex w-full flex-col items-center gap-2.5 whitespace-nowrap py-3 duration-75 hover:text-red-100 lg:flex-row"
					>
						<component :is="item.icon" class="h-5 w-5 fill-white-100" />
						<span class="text-xs font-semibold uppercase tracking-wide">
							{{ item.name }}
						</span>
					</NuxtLink>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script lang="ts" setup>
import {
	IconUserCircle,
	IconEdit,
	IconPassword,
	IconMail,
	IconAdjustment,
	IconShoppingBag,
	IconHelpCircle,
	IconGlobe,
} from '~/icons';

const profileLinksGroups = [
	{
		category: 'My account',
		items: [
			{
				name: 'Profile',
				icon: IconUserCircle,
				slug: '/user',
			},
			{
				name: 'Edit profile',
				icon: IconEdit,
				slug: '/user/edit-profile',
			},
			{
				name: 'Password',
				icon: IconPassword,
				slug: '/user/password',
			},
			{
				name: 'Emails Settings',
				icon: IconMail,
				slug: '/user/preferences',
			},
			{
				name: 'Content',
				icon: IconAdjustment,
				slug: '/',
			},
			{
				name: 'Billing details',
				icon: IconShoppingBag,
				slug: '/user/billing-address',
			},
			{
				name: 'Help',
				icon: IconHelpCircle,
				slug: '/user/help-center',
			},
		],
	},
	{
		category: 'Professional',
		items: [
			{
				name: 'News sources',
				icon: IconGlobe,
				slug: '/user/news-sources',
			},
		],
	},
];
</script>
<style>
.router-link-exact-active {
	color: #ad100c;
}
</style>
