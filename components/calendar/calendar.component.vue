<template>
	<div>
		<div
			class="flex items-center justify-between bg-dark-100 px-5 py-3 text-white-100"
		>
			<button class="pointer-events-auto">
				<IconChevronLeft class="h-3 w-3" />
			</button>
			<span class="text-lg font-bold">{{ t('months.january') }}</span>
			<button class="pointer-events-auto">
				<IconChevronRight class="h-3 w-3" />
			</button>
		</div>
		<div class="text-cente lg:px-5r grid grid-cols-7 bg-grey-200 px-3 py-3">
			<span>{{ t('days.monday') }}</span>
			<span>{{ t('days.tuesday') }}</span>
			<span>{{ t('days.wednesday') }}</span>
			<span>{{ t('days.thursday') }}</span>
			<span>{{ t('days.friday') }}</span>
			<span>{{ t('days.saturday') }}</span>
			<span>{{ t('days.sunday') }}</span>
		</div>
		<div class="grid grid-cols-7 px-3 py-3 text-center lg:px-5">
			<span
				v-for="(i, index) in 31"
				:key="index"
				class="mx-auto my-1 h-11 w-11 rounded-full py-3"
				:class="{
					'bg-red-100 text-white-100': i === 11,
					'bg-blue-100 text-white-100': i === 18,
				}"
				>{{ i }}</span
			>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { IconChevronLeft, IconChevronRight } from '~/icons';

const { t } = useI18n();
</script>
