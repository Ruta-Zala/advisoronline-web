<template>
	<div class="flex flex-wrap gap-2 pb-14">
		<div class="flex w-full flex-col items-center justify-center">
			<div class="w-full space-y-8 p-4 lg:w-1/2">
				<IconUnlock class="mx-auto h-20 w-20 text-white-100" />
				<h1
					class="text-center font-serif text-[34px] font-semibold text-white-100"
				>
					{{ t('login.registered-access') }}
				</h1>
				<form class="mx-auto bg-white-100 p-6" @submit="onSubmit">
					<i18n-t
						keypath="login.header.head"
						tag="h1"
						class="p-4 font-serif text-4xl font-normal text-dark-100"
					>
						<span class="font-semibold text-red-100">
							{{ t('login.header.tail') }}</span
						>
					</i18n-t>
					<div class="w-full space-y-6 p-4 text-sm font-semibold">
						<div class="flex flex-wrap">
							<div class="w-full">
								<TextField
									id="email"
									v-model="email"
									type="email"
									:icon="IconUser"
									:label="t('login.id-email')"
									required
									:disabled="submitting"
								/>
							</div>
						</div>
						<div class="flex flex-wrap">
							<div class="w-full">
								<TextField
									id="password"
									v-model="password"
									:icon="IconKey"
									type="password"
									:label="t('shared.password')"
									required
									:disabled="submitting"
								/>
							</div>
						</div>

						<div class="flex justify-between">
							<label class="flex cursor-pointer select-none">
								<Checkbox v-model="rememberMe" />
								<p class="ml-3">{{ t('login.remember-me') }}</p>
							</label>
							<a href="/auth/forgot-password">{{ t('forgot-password') }}</a>
						</div>

						<button
							type="submit"
							:disabled="submitting"
							class="w-full bg-red-100 p-3 font-semibold uppercase text-white-100 hover:bg-red-200"
						>
							{{ t('login') }}
						</button>

						<ul class="ml-4 list-disc text-red-100">
							<li v-for="error in errors" :key="error">
								{{ error }}
							</li>
						</ul>
					</div>
				</form>
				<div class="mx-auto bg-white-100 p-6 py-10">
					<h1 class="px-4 font-serif text-4xl font-normal text-dark-100">
						{{ t('login.not-member') }}
					</h1>

					<div class="w-full px-4 text-sm font-semibold">
						<i18n-t keypath="register.account.subtitle.head" tag="p">
							<span class="font-bold text-red-100">
								{{ t('register.account.subtitle.tail') }}</span
							>
						</i18n-t>
						<a
							href="/auth/register"
							class="mt-8 inline-block w-full bg-dark-100 p-3 text-center font-semibold uppercase text-white-100 hover:bg-dark-200"
						>
							{{ t('login.create-account') }}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { IconUnlock, IconUser, IconKey } from '~/icons';
import TextField from '~/components/text-field/text-field.component.vue';
import Checkbox from '~/components/input-checkbox/input-checkbox.component.vue';
import { StrapiResponse } from '~/utils/types';

definePageMeta({ layout: 'auth-layout', middleware: 'unauthenticated' });

const { t } = useI18n();
const apiUrl = useApiUrl();
const { onLogin } = useApollo();
const userInfo = useUserInfo();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errors = ref<string[]>([]);
const submitting = ref(false);

async function onSubmit(e: Event) {
	const form = e.target as HTMLFormElement;

	if (!form.reportValidity()) return;

	e.preventDefault();

	submitting.value = true;

	try {
		const response = await $fetch<any>(apiUrl('auth/local'), {
			method: 'POST',
			body: {
				identifier: email.value,
				password: password.value,
			},
		});

		userInfo.value = response.user;
		onLogin(response.jwt);
		// Do a full refresh just to make sure the entire state was reset
		window.location.pathname = '/';
	} catch (e) {
		if (!isFetchError<StrapiResponse>(e)) throw e;

		const error = e.data?.error ? [e.data?.error] : undefined;
		const errorMore = e.data?.error?.details.errors;
		const theErrors = (errorMore ?? error ?? []).map((e) => e.message);

		errors.value = theErrors.length
			? theErrors
			: [t('error.something-went-wrong')];
	} finally {
		submitting.value = false;
	}
}
</script>
