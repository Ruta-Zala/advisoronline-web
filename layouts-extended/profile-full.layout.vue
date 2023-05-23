<template>
	<div>
		<Navbar :categories="headerMenu" />
		<Sidebar :categories="headerMenu" />
		<div
			class="relative overflow-hidden bg-white-100 pt-[60px] transition-[padding] lg:pt-20"
		>
			<div class="container relative pt-2.5 md:pt-4 lg:mt-8 lg:pt-8">
				<div class="text-center lg:text-left">
					<div class="-ml-3">
						<Breadcrumbs v-bind="props.breadcrumbsArgs" />
					</div>
					<div class="mt-4 font-serif text-[34px]">
						<span class="font-semibold text-red-100">
							{{ processedTitle.head }}&nbsp;
						</span>
						<span class="font-normal text-dark-100">
							{{ processedTitle.tail }}
						</span>
					</div>
					<p class="text-base font-normal text-dark-100">
						{{ props.subHeader }}
					</p>
				</div>

				<slot />
			</div>
		</div>
		<Footer :categories="footerMenu" full-width />
		<GlobalModals />
	</div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import Navbar from '~/pages/components/navbar.component.vue';
import Footer from '~/components/footer/footer.component.vue';
import Sidebar from '~/pages/components/sidebar.component.vue';
import GlobalModals from '~/pages/components/global-modals.component.vue';
import Breadcrumbs, {
	BreadcrumbsProps,
} from '~/components/breadcrumbs/breadcrumbs.component.vue';
import { useLayoutData } from '~/composables/use-layout-data';
import { makeSnake } from '~/utils/make-snake';

const props = defineProps({
	header: {
		type: String,
		required: true,
	},
	subHeader: {
		type: String,
		required: true,
	},
	breadcrumbsArgs: {
		type: Object as PropType<BreadcrumbsProps>,
		required: true,
	},
});

const processedTitle = computed(() => makeSnake(props.header));

const { headerMenu, footerMenu } = await useLayoutData();
</script>
