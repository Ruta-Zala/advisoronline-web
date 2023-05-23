<template>
	<footer class="relative text-white-100">
		<div :class="{ 'bg-dark-200': props.fullWidth }">
			<div class="container bg-dark-200">
				<div class="flex items-center justify-between py-5 sm:py-3">
					<div class="flex w-full gap-5">
						<div v-for="(social, index) in socials" :key="index">
							<a :href="social.url" target="_blank" rel="noopener">
								<component
									:is="social.icon"
									class="h-5 w-5 duration-75 hover:text-red-100"
								/>
							</a>
						</div>
					</div>
					<div class="hidden sm:block">
						<AdvisorLogo class="w-36" />
					</div>
					<div class="flex w-full justify-end">
						<button
							class="flex items-center gap-2.5 duration-75 hover:text-red-100"
							@click="scrollToTop"
						>
							<h3 class="text-xs font-medium">{{ t('footer.to-top') }}</h3>
							<IconChevronUp class="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
		<div :class="{ 'bg-dark-100': props.fullWidth }">
			<div class="container bg-dark-100">
				<div
					class="flex flex-col gap-20 border-b border-grey-200/20 py-16 lg:flex-row"
				>
					<div
						class="flex flex-col gap-2.5 text-center font-serif text-lg font-medium lg:max-w-xs"
					>
						<a
							href="/auth/register"
							class="border border-red-200 px-4 py-3 text-center duration-75 hover:text-red-100"
						>
							{{ t('footer.join-community') }}
						</a>
						<a
							href="/auth/login"
							class="bg-red-100 px-2 py-3 text-center duration-75 hover:bg-red-200"
						>
							{{ t('footer.access-articles') }}
						</a>
					</div>
					<div
						class="grid w-full grid-cols-2 justify-around gap-y-16 md:grid-cols-4"
					>
						<div v-for="category in categories" :key="category.id">
							<h2 class="font-serif text-lg font-medium tracking-wide">
								{{ category.title }}
							</h2>
							<template v-for="item in category.items ?? []" :key="item?.id">
								<a
									v-if="item?.path"
									:href="item?.path"
									class="mt-4 block text-sm font-extralight tracking-wide"
								>
									{{ item?.title }}
								</a>
							</template>
						</div>
					</div>
				</div>
				<div class="py-10 text-center tracking-wider">
					<p class="mb-2 text-[13px] font-light">
						{{ 'VAT no. IT 07114400968 | ©' }} {{ t('footer.copyright-text') }}
					</p>
					<div
						class="flex flex-wrap justify-center gap-2 divide-x divide-solid text-[13px] text-sm font-light text-grey-100"
					>
						<a
							v-for="(item, index) in policy"
							:key="index"
							:href="item.link"
							class="border-grey-100 pl-2 first:pl-0"
							>{{ item.text }}</a
						>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import AdvisorLogo from '~/assets/advisor-logo.component.vue';
import { socials } from '~/utils/socials';
import IconChevronUp from '~/icons/icon-chevron-up.component.vue';
import { NavigationItem } from '~/types/graphql';

interface FooterProps {
	fullWidth?: boolean;
	categories: NavigationItem[];
}

const { t } = useI18n();

const props = withDefaults(defineProps<FooterProps>(), {
	fullWidth: false,
});

const scrollToTop = () => window.scrollTo(0, 0);

const policy = [
	{
		text: 'Information on cookies',
		link: '#',
	},
	{
		text: 'Privacy policy',
		link: '#',
	},
	{
		text: 'Terms and conditions',
		link: '#',
	},
	{
		text: 'Cookie policy',
		link: '#',
	},
];
</script>
