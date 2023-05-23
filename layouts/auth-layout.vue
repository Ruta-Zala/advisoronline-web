<template>
	<div>
		<Navbar :categories="headerMenu" />
		<Sidebar :categories="headerMenu" />
		<div
			class="relative overflow-hidden bg-grey-1 pt-[60px] transition-[padding] lg:pt-[113px]"
		>
			<img
				src="/images/no-ad-background-image.png"
				alt="img"
				class="absolute right-1/2 top-[113px] hidden w-[1920px] min-w-max shrink-0 translate-x-1/2 lg:block"
			/>
			<div
				class="container relative bg-dark-100 pt-2.5 md:pt-4 lg:mt-8 lg:bg-transparent lg:pt-8"
			>
				<slot />
			</div>
		</div>
		<Footer :categories="footerMenu" full-width />
		<GlobalModals />
	</div>
</template>

<script lang="ts" setup>
import Navbar from '~/pages/components/navbar.component.vue';
import Sidebar from '~/pages/components/sidebar.component.vue';
import GlobalModals from '~/pages/components/global-modals.component.vue';
import Footer from '~/components/footer/footer.component.vue';
import { useLayoutData } from '~/composables/use-layout-data';

const { headerMenu, footerMenu } = await useLayoutData();
</script>
