<template>
	<ProfileLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('password.shared.header')"
		:sub-header="t('password.subheader')"
	>
		<BlockHeader
			:title="t('shared.reset-password')"
			:hide-underline="false"
			class="mb-10"
		/>
		<div class="space-y-2">
			<h3 class="text-base font-bold text-dark-100">
				{{ t('password.change-request') }}
			</h3>
			<p class="text-sm">
				{{ t('password.description') }}
			</p>
		</div>
		<div class="py-8">
			<button
				:disabled="isRequesting"
				type="button"
				class="dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2 inline-flex items-center bg-red-100 px-12 py-4 text-center text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
				@click="sendResetRequest"
			>
				<IconSpinner
					v-if="isRequesting"
					class="mr-3 inline h-4 w-4 animate-spin"
				/>
				{{
					isRequesting
						? t('shared.reset-password-request')
						: t('shared.reset-password')
				}}
			</button>
		</div>
		<ResetPasswordRequest :show="isShow" @hide-dialog="isShow = false" />
	</ProfileLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ProfileLayout from '~/layouts-extended/profile.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import ResetPasswordRequest from './components/reset-password-request.component.vue';
import { IconSpinner } from '~/icons';
import { StrapiResponse } from '~/utils/types';

definePageMeta({
	layout: false,
});

const { t } = useI18n();
const apiUrl = useApiUrl();
const { $globalSettings } = useNuxtApp();
const { user, signOut } = $globalSettings;

const breadcrumbsArgs = {
	list: [
		{
			name: t('shared.account'),
			url: '#',
		},
	],
	current: t('password.shared.header'),
};

const isShow = ref(false);
const isRequesting = ref(false);

async function sendResetRequest() {
	isRequesting.value = true;
	try {
		await $fetch<{ jwt: string; user: any }>(apiUrl('auth/forgot-password'), {
			method: 'POST',
			body: { email: user.value?.email },
		});
	} catch (e) {
		if (!isFetchError<StrapiResponse>(e)) throw e;
	} finally {
		isShow.value = true;
		isRequesting.value = false;
		setTimeout(() => {
			signOut();
		}, 3000);
	}
}
</script>
