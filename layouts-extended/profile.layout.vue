<template>
	<ProfileFullLayout
		:breadcrumbs-args="props.breadcrumbsArgs"
		:header="props.header"
		:sub-header="props.subHeader"
	>
		<div class="mt-8 flex w-full flex-col lg:flex-row">
			<div class="mb-4 w-full border-r-grey-100 lg:w-1/5 lg:border-r">
				<ProfileMenu />
			</div>
			<div class="w-full px-4 lg:w-4/5 lg:px-12">
				<slot />
			</div>
		</div>
	</ProfileFullLayout>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BreadcrumbsProps } from '~/components/breadcrumbs/breadcrumbs.component.vue';
import ProfileMenu from '~/components/profile-menu/profile-menu.component.vue';

import ProfileFullLayout from '~/layouts-extended/profile-full.layout.vue';

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
</script>
