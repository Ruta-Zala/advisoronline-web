<template>
	<form action="/search" method="get" class="flex w-full gap-4">
		<div class="flex w-full items-center border border-grey-100 px-4 py-1">
			<input
				name="q"
				type="text"
				class="w-full border-none text-sm tracking-wide ring-0 focus:ring-0"
				:placeholder="placeholder ?? t('search.for')"
			/>
			<button class="h-6 w-6 duration-100 hover:text-red-100">
				<IconSearch class="h-5 w-5" />
			</button>
		</div>
		<button
			v-if="showButton"
			class="bg-red-100 px-6 text-xs uppercase tracking-wider text-white-100 duration-100 hover:bg-red-200"
		>
			{{ t('shared.search') }}
		</button>
	</form>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconSearch from '~/icons/icon-search.component.vue';

const { t } = useI18n();

defineProps({
	placeholder: {
		type: String,
		default: undefined,
	},
	showButton: {
		type: Boolean,
		default: true,
	},
});
</script>
