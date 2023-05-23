<template>
	<div :class="bgColor">
		<div
			:class="[
				{
					'md:flex-nowrap lg:mx-20 lg:gap-10 xl:mx-40':
						direction === 'horizontal',
				},
			]"
			class="mx-5 flex flex-wrap items-center justify-center gap-5 py-14"
		>
			<div v-if="direction === 'vertical'" class="text-center">
				<h2
					class="mb-3 font-serif text-[30px] font-bold tracking-wide sm:text-4xl md:text-[32px] lg:text-[36px]"
				>
					{{ props.title ?? t('news-magazine.title') }}
				</h2>
				<p class="mb-9 font-medium leading-8 tracking-wide">
					{{ props.subtitle ?? t('news-magazine.subtitle') }}
				</p>
			</div>
			<img
				v-if="props.image"
				:src="props.image"
				alt="img"
				:class="[
					{
						'lg:max-w-[500px]': direction === 'horizontal',
					},
				]"
				class="w-full max-w-xs"
			/>

			<div class="text-center md:text-left">
				<template v-if="direction === 'horizontal'">
					<h2
						class="mb-3 font-serif text-[30px] font-bold tracking-wide sm:text-4xl md:text-[32px] lg:text-[36px]"
					>
						{{ props.title ?? t('news-magazine.title') }}
					</h2>
					<p class="mb-9 font-medium leading-8 tracking-wide">
						{{ props.subtitle ?? t('news-magazine.subtitle') }}
					</p>
				</template>
				<div v-if="direction === 'horizontal'" class="text-center md:text-left">
					<div
						class="flex w-full flex-wrap items-center justify-center space-x-4 whitespace-nowrap sm:flex-nowrap md:justify-start"
					>
						<a
							:href="detailsLink"
							class="block bg-red-100 px-7 py-4 text-center text-xs font-medium tracking-wide text-white-100 duration-75 hover:bg-red-200"
						>
							{{ t('news-magazine.discover') }}
						</a>
						<a
							:href="demosLink"
							class="px-7 py-4 text-center text-xs font-semibold duration-75 hover:text-red-100"
						>
							{{ t('news-magazine.explore-demos') }}
						</a>
					</div>
				</div>
			</div>
			<div v-if="direction === 'vertical'" class="w-full text-center">
				<div class="flex items-center gap-4 whitespace-nowrap">
					<a
						:href="detailsLink"
						class="block w-full border border-red-100 bg-red-100 px-7 py-4 text-xs font-medium tracking-wide text-white-100 duration-75 hover:bg-red-200"
					>
						{{ t('news-magazine.discover') }}
					</a>
					<a
						:href="demosLink"
						class="w-full border border-dark-100 px-7 py-4 text-xs font-semibold duration-75 hover:text-red-100"
					>
						{{ t('news-magazine.explore-demos') }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

export interface NewsMagazineProps {
	title?: string;
	subtitle?: string;
	detailsLink: string;
	demosLink: string;
	direction?: 'horizontal' | 'vertical';
	bgColor?: string;
	image?: string;
}

const { t } = useI18n();

const props = withDefaults(defineProps<NewsMagazineProps>(), {
	title: undefined,
	subtitle: undefined,
	direction: 'horizontal',
	bgColor: 'bg-grey-200',
	image: undefined,
	detailsLink: '/Scopri i dettagli',
	demosLink: '/Guarda una demo',
});
</script>
