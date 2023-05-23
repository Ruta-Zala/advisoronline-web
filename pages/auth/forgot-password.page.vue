<template>
	<div class="flex flex-wrap gap-2 pb-24">
		<div class="flex w-full flex-col items-center justify-center">
			<div class="w-full space-y-8 p-4 lg:w-1/2">
				<IconUnlock class="mx-auto h-20 w-20 text-white-100" />
				<h1
					class="text-center font-serif text-[34px] font-semibold text-white-100"
				>
					{{ t('forgot-password') }}
				</h1>
				<div v-if="!emailSent" class="mx-auto bg-white-100 p-6">
					<i18n-t
						keypath="forgot-password.header.head"
						tag="h1"
						class="p-4 font-serif text-4xl font-normal text-dark-100"
					>
						<span class="font-semibold text-red-100">
							{{ t('forgot-password.header.tail') }}</span
						>
					</i18n-t>
					<form class="space-y-6 p-4 text-sm font-semibold" @submit="onSubmit">
						<TextField
							v-model="email"
							:icon="IconMail"
							type="email"
							:label="t('shared.email')"
							required
							:disabled="submitting"
						/>

						<button
							type="submit"
							:disabled="submitting"
							class="w-full bg-red-100 p-3 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
						>
							{{ t('shared.reset-password') }}
						</button>
					</form>
				</div>
				<div
					v-if="emailSent"
					class="relative flex flex-col items-center justify-center space-y-4 bg-white-100 p-5 py-8 text-center md:px-4"
				>
					<IconCheck class="my-6 h-[42px] w-[60px] text-red-100" />
					<h2
						class="font-serif text-[26px] font-bold tracking-wide text-red-100"
					>
						{{ t('forgot-password.reset.email') }}
					</h2>
					<div class="max-w-md text-sm font-semibold leading-7 tracking-wide">
						{{ t('forgot-password.reset.description') }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { IconUnlock, IconMail, IconCheck } from '~/icons';
import TextField from '~/components/text-field/text-field.component.vue';
import { StrapiResponse } from '~/utils/types';

definePageMeta({ layout: 'auth-layout', middleware: 'unauthenticated' });

const { t } = useI18n();

const apiUrl = useApiUrl();

const email = ref('');
const submitting = ref(false);
const emailSent = ref(false);

async function onSubmit(e: Event) {
	const form = e.target as HTMLFormElement;

	if (!form.reportValidity()) return;

	e.preventDefault();

	submitting.value = true;

	try {
		await $fetch<{ jwt: string; user: any }>(apiUrl('auth/forgot-password'), {
			method: 'POST',
			body: { email: email.value },
		});
	} catch (e) {
		if (!isFetchError<StrapiResponse>(e)) throw e;
	} finally {
		submitting.value = false;
		emailSent.value = true;
	}
}
</script>
