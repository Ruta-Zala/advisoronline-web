<template>
	<div>
		<Navbar :categories="headerMenu" />
		<Sidebar :categories="headerMenu" />
		<div
			class="relative overflow-hidden pt-[60px] transition-[padding] lg:pt-[113px]"
			:class="{
				'bg-grey-1': props.variant === 'light',
				'bg-dark-200': props.variant === 'dark',
			}"
		>
			<img
				src="/images/background-image.png"
				alt="img"
				class="absolute right-1/2 top-[113px] hidden w-[1920px] min-w-max shrink-0 translate-x-1/2 lg:block"
			/>

			<Container :variant="props.variant" class="lg:mt-[200px]">
				<slot />
			</Container>
			<Footer :categories="footerMenu" />
		</div>
		<GlobalModals />
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import Container from '~/components/container/container.component.vue';
import Navbar from '~/pages/components/navbar.component.vue';
import Footer from '~/components/footer/footer.component.vue';
import Sidebar from '~/pages/components/sidebar.component.vue';
import GlobalModals from '~/pages/components/global-modals.component.vue';
import { ThemeVariant, themeVariantValidator } from '~/constants/theme-variant';
import { useLayoutData } from '~/composables/use-layout-data';

const props = defineProps({
	variant: {
		type: String as PropType<ThemeVariant>,
		default: () => 'light' satisfies ThemeVariant,
		validator: themeVariantValidator,
	},
});

const { headerMenu, footerMenu } = await useLayoutData();
</script>
