<template>
	<div class="space-y-2 px-4">
		<i18n-t
			keypath="register.account.header.head"
			tag="h1"
			class="font-serif text-4xl font-normal text-dark-100"
		>
			<span class="font-semibold text-red-100">
				{{ t('register.account.header.tail') }}</span
			>
		</i18n-t>
		<i18n-t
			keypath="register.account.subtitle.head"
			tag="p"
			class="text-base font-normal text-dark-100"
		>
			<span class="font-semibold text-red-100">
				{{ t('register.account.subtitle.tail') }}</span
			>
		</i18n-t>
	</div>
	<form class="w-full space-y-6 px-4 text-sm" @submit="onSubmit">
		<div class="flex flex-wrap gap-4 md:gap-0">
			<div class="w-full md:mb-0 md:w-1/2 md:pr-3">
				<TextField
					id="name"
					v-model="account.firstName"
					:label="t('shared.name')"
					required
				/>
			</div>
			<div class="w-full md:w-1/2 md:pl-3">
				<TextField
					id="surname"
					v-model="account.lastName"
					:label="t('shared.surname')"
					required
				/>
			</div>
		</div>
		<div class="flex flex-wrap">
			<div class="w-full">
				<TextField
					v-model="account.email"
					type="email"
					:label="t('shared.email')"
					:icon="IconMail"
					required
				/>
			</div>
		</div>
		<div class="flex items-center text-base font-semibold">
			<Toggle
				v-model="account.professionalUser"
				:disabled="account.advancedUser"
				class="shrink-0"
			/>
			<p class="ml-3">{{ t('register.account.OCF-text') }}</p>
		</div>
		<div class="flex items-center text-base font-semibold">
			<Toggle
				v-model="account.advancedUser"
				:disabled="account.professionalUser"
				class="shrink-0"
			/>
			<p class="ml-3">{{ t('register.account.free-user-text') }}</p>
		</div>
		<div class="flex items-center text-base font-semibold">
			<Toggle v-model="account.newsletterEnabled" class="shrink-0" />
			<p class="ml-3">
				{{ t('register.account.receive-news') }}
			</p>
		</div>

		<p class="text-justify text-sm font-normal">
			{{ t('register.account.description.part1') }}
			<span class="font-semibold">{{
				t('register.account.description.part2')
			}}</span>
			{{ t('register.account.description.part3') }}
		</p>
		<div class="flex">
			<Checkbox v-model="account.acceptTerms" />
			<p class="ml-3">
				{{ t('register.account.accept-terms.part1') }}
				<a href="" class="underline"
					>{{ t('register.account.accept-terms.part2') }}&nbsp;</a
				>
				<i18n-t keypath="register.account.accept-terms.part3">
					<a href="/privacy-policy" class="underline">{{
						t('register.account.accept-terms.part4')
					}}</a>
				</i18n-t>
			</p>
		</div>
		<div class="flex">
			<Checkbox v-model="account.dataPolicy" />
			<p class="ml-3">
				{{ t('register.account.data-policy') }}
			</p>
		</div>
		<button
			type="submit"
			class="w-full bg-dark-100 p-3 font-semibold text-white-100 hover:bg-dark-200 disabled:opacity-50"
			:disabled="!stepValid"
		>
			{{ t('shared.continue') }}
		</button>

		<i18n-t
			keypath="register.account.login-here.head"
			tag="div"
			class="pt-4 text-center text-[13px] font-semibold"
		>
			<a href="/auth/login" class="text-[14px] text-red-100">{{
				t('register.account.login-here.tail')
			}}</a>
		</i18n-t>
	</form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IconMail } from '~/icons';
import Toggle from '~/components/input-toggle/input-toggle.component.vue';
import Checkbox from '~/components/input-checkbox/input-checkbox.component.vue';
import TextField from '~/components/text-field/text-field.component.vue';

const emit = defineEmits(['update:firstStep']);
const props = defineProps<{ initialValues: unknown }>();

const { t } = useI18n();
const route = useRoute();

const account = ref({
	firstName: '',
	lastName: '',
	email: '',
	professionalUser: false,
	advancedUser: false,
	newsletterEnabled: route.query.subscribe === 'true',
	acceptTerms: false,
	dataPolicy: false,
	...(props.initialValues as {}),
});

const stepValid = computed(() => {
	const fieldsToPass = [
		account.value.firstName,
		account.value.lastName,
		account.value.professionalUser || account.value.advancedUser,
		account.value.acceptTerms,
		account.value.dataPolicy,
	];

	return fieldsToPass.every(Boolean);
});

function onSubmit(e: Event) {
	e.preventDefault();

	if (stepValid.value) emit('update:firstStep', account.value);
}
</script>
