<template>
	<div class="flex flex-wrap gap-2 pb-14">
		<div class="flex w-full flex-col items-center justify-center">
			<div class="w-full space-y-8 p-4 lg:w-1/2">
				<IconUnlock class="mx-auto h-20 w-20 text-white-100" />
				<h1
					class="text-center font-serif text-[34px] font-semibold text-white-100"
				>
					{{ t('shared.reset-password') }}
				</h1>
				<div v-if="!passwordChanged" class="mx-auto bg-white-100 p-6">
					<h1 class="p-4 font-serif text-4xl font-normal text-dark-100">
						<span class="font-semibold text-red-100">
							{{ t('reset-password.header.head') }}
						</span>
						{{ t('reset-password.header.tail') }}
					</h1>
					<form
						class="w-full space-y-6 p-4 text-sm font-semibold"
						@submit="onSubmit"
					>
						<div>
							<TextField
								v-model="password1"
								:icon="IconKey"
								type="password"
								:label="t('reset-password.new-password')"
								show-password-icon
								required
							/>

							<div class="mt-2 flex items-center justify-center gap-2">
								{{ t('reset-password.password-security') }} :
								<div class="flex gap-2">
									<div
										v-for="badge in 4"
										:key="badge"
										class="h-[10px] w-[10px] rounded-full border border-red-100"
										:class="{
											'bg-red-100': badge <= newPasswordStrength,
										}"
									></div>
								</div>
							</div>
						</div>

						<div>
							<div class="w-full">
								<TextField
									v-model="password2"
									:icon="IconKey"
									type="password"
									:label="t('reset-password.confirm-password')"
									show-password-icon
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							class="w-full bg-red-100 p-3 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
						>
							{{ t('reset-password.change-password') }}
						</button>

						<ul class="ml-4 list-disc text-red-100">
							<li v-for="error in errors" :key="error">
								{{ error }}
							</li>
						</ul>
					</form>
				</div>
				<div
					v-if="passwordChanged"
					class="relative flex flex-col items-center justify-center space-y-4 bg-white-100 p-5 py-8 text-center md:px-4"
				>
					<IconCheck class="my-6 h-[42px] w-[60px] text-red-100" />
					<h2
						class="font-serif text-[26px] font-bold tracking-wide text-red-100"
					>
						{{ t('reset-password.password-changed') }}
					</h2>
					<div class="text-sm font-semibold leading-7 tracking-wide">
						{{ t('reset-password.login-with-new-password') }}
					</div>
					<a
						href="/auth/login"
						type="button"
						class="w-full bg-dark-100 p-3 text-xs font-semibold uppercase text-white-100 hover:bg-dark-200"
					>
						{{ t('reset-password.back-to-login') }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { IconUnlock, IconKey, IconCheck } from '~/icons';
import { passwordStrengthChecker } from '~/utils/password-strength-checker';
import TextField from '~/components/text-field/text-field.component.vue';
import { StrapiResponse } from '~/utils/types';

definePageMeta({ layout: 'auth-layout', middleware: 'unauthenticated' });

const { t } = useI18n();
const apiUrl = useApiUrl();
const route = useRoute();

const password1 = ref('');
const password2 = ref('');
const submitting = ref(false);
const passwordChanged = ref(false);
const errors = ref<string[]>(
	route.query.code ? [] : [t('reset-password.code-required')],
);

const newPasswordStrength = computed(() =>
	password1.value ? passwordStrengthChecker(password1.value) : 0,
);

async function onSubmit(e: Event) {
	const form = e.target as HTMLFormElement;

	if (!form.reportValidity()) return;

	e.preventDefault();

	submitting.value = true;

	try {
		await $fetch<{ jwt: string; user: any }>(apiUrl('auth/reset-password'), {
			method: 'POST',
			body: {
				code: route.query.code,
				password: password1.value,
				passwordConfirmation: password2.value,
			},
		});

		passwordChanged.value = true;
	} catch (e) {
		if (!isFetchError<StrapiResponse>(e)) throw e;

		const error = e.data?.error ? [e.data?.error] : undefined;
		const errorMore = e.data?.error?.details.errors;
		const theErrors = (errorMore ?? error ?? []).map((e) => e.message);

		errors.value = theErrors.length ? theErrors : ['Something went wrong'];
	} finally {
		submitting.value = false;
	}
}
</script>
