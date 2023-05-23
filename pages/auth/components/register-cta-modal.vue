<template>
	<ClientOnly>
		<AdvisorDialogContianer v-model="isOpen">
			<AdvisorDialogOverlay />
			<AdvisorDialogPanel class="bg-white-100 p-8 text-dark-200">
				<button
					class="flex w-full justify-end outline-none"
					@click="isOpen = false"
				>
					<IconClose class="h-4 w-4 text-grey-100" />
				</button>
				<div
					class="relative flex flex-col items-center justify-center p-5 text-center md:px-12"
				>
					<IconLock class="mb-6 h-20 w-20 text-grey-100" />
					<h2 class="font-serif text-[26px] font-bold tracking-wide">
						{{ t('register-cta.header') }}
					</h2>
					<hr class="my-4 w-20" />

					<i18n-t
						keypath="register-cta.subtitle.head"
						tag="div"
						class="text-sm font-semibold leading-7 tracking-wide"
					>
						<p class="text-red-100">{{ t('register-cta.subtitle.tail') }}</p>
					</i18n-t>
					<ul class="my-4 list-disc text-left text-[13px]">
						<li>{{ t('shared.feature.access-magazines') }}</li>
						<li>{{ t('shared.feature.exclusive-articles') }}</li>
						<li>{{ t('shared.feature.follow-news') }}</li>
						<li>{{ t('shared.feature.receive-notifications') }}</li>
					</ul>
					<a
						href="/auth/login"
						class="mt-4 bg-red-100 p-3 px-12 font-semibold text-white-100 hover:bg-red-200"
					>
						{{ t('shared.sign-in-login') }}
					</a>
				</div>
			</AdvisorDialogPanel>
		</AdvisorDialogContianer>
	</ClientOnly>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import AdvisorDialogContianer from '~/components/advisor-dialog/advisor-dialog.component.vue';
import AdvisorDialogOverlay from '~/components/advisor-dialog/advisor-dialog-overlay.component.vue';
import AdvisorDialogPanel from '~/components/advisor-dialog/advisor-dialog-panel.component.vue';
import { IconClose, IconLock } from '~/icons';

const { t } = useI18n();
const isOpen = ref(true);
</script>
