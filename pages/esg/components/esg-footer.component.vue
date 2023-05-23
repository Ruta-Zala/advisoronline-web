<template>
	<div class="container-cancel">
		<SectionThree
			v-if="sectionThreeArgs"
			v-slot="slide"
			v-bind="sectionThreeArgs"
		>
			<CardVideoSeries v-bind="slide" />
		</SectionThree>
		<NewsMagazine
			v-if="magazine"
			:title="magazine.title"
			:subtitle="magazine.subtitle"
			:details-link="magazine.detailsLink"
			:demos-link="magazine.demosLink"
			:image="magazine.image"
		/>
	</div>
	<div class="container-cancel relative mb-14 h-[300px]">
		<img
			:src="getFakeImage()"
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<div
			class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
		>
			{{ t('shared.ad-space') }}
		</div>
	</div>
	<BlockHeader :title="t('shared.looking-for-categories')" class="mb-4" />
	<Searchbar class="mb-8" />
	<ExploreCategories
		v-if="categories?.length"
		:categories="categories"
		:title="categoryTitle"
	/>
</template>
<script lang="ts" setup>
import SectionThree, {
	SectionThreeProps,
} from '~/components/section-three/section-three.component.vue';
import CardVideoSeries from '~/components/card-video-series/card-video-series.component.vue';
import NewsMagazine, {
	NewsMagazineProps,
} from '~/components/news-magazine/news-magazine.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import Searchbar from '~/components/searchbar/searchbar.component.vue';
import ExploreCategories from '~/components/explore-categories/explore-categories.component.vue';

export interface ESGFooterProps {
	sectionThreeArgs: SectionThreeProps;
	categoryTitle?: string;
	magazine?: NewsMagazineProps;
	categories?: Array<{
		image: string;
		name: string;
		url: string;
	}>;
}

const { t } = useI18n();

defineProps<ESGFooterProps>();
</script>
