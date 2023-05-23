<template>
	<div class="flex flex-wrap gap-2 pb-14 lg:flex-nowrap">
		<div
			class="flex w-full flex-col items-start justify-center p-8 lg:flex-row"
		>
			<div class="relative space-y-8 p-4 lg:w-1/2">
				<div class="mx-auto space-y-10 bg-white-100 px-6 pb-12">
					<Stepper v-if="activeStepNumber < steps.length" :steps="steps" />
					<AccountRegistration
						v-if="activeStepNumber === 0"
						:initial-values="allStepsData"
						@update:first-step="setStepData"
					/>
					<DetailsRegistration
						v-if="activeStepNumber === 1"
						:initial-values="allStepsData"
						@update:second-step="setStepData"
						@back="back"
					/>
					<PreferenceRegistration
						v-if="activeStepNumber === 2"
						:initial-values="allStepsData"
						:errors="errors"
						@update:complete-all-step="onSubmit"
						@back="back"
					/>
					<WelcomeCard v-if="activeStepNumber === 3" />
					<div v-if="submitting" class="absolute inset-0" />
				</div>
				<div v-if="activeStepNumber < steps.length" class="bg-white-100 p-12">
					<h1 class="text-[34px] font-normal">{{ t('shared.faqs') }}</h1>
					<div class="divide-y divide-grey-100">
						<Accordion
							v-for="item in faqList"
							:key="item.title"
							:title="item.title"
						>
							{{ item.body }}
						</Accordion>
					</div>
				</div>
				<div v-if="activeStepNumber === 3" class="bg-white-100 p-6">
					<NewsMagazine direction="vertical" bg-color="bg-white-100" />
				</div>
			</div>
			<div v-if="activeStepNumber === 0" class="lg:w-1/2">
				<CTALogin class="text-dark-100 lg:text-white-100" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Stepper, {
	StepperStep,
} from '~/components/stepper/stepper.component.vue';
import AccountRegistration from '~/pages/auth/components/account-register.component.vue';
import DetailsRegistration from '~/pages/auth/components/details-register.component.vue';
import PreferenceRegistration from '~/pages/auth/components/preference-register.component.vue';
import Accordion from '~/components/accordion/accordion.component.vue';
import CTALogin from '~/components/cta-login/cta-login.component.vue';
import NewsMagazine from '~/components/news-magazine/news-magazine.component.vue';
import WelcomeCard from '~/pages/auth/components/welcome-card.component.vue';
import { StrapiResponse } from '~/utils/types';

definePageMeta({ layout: 'auth-layout', middleware: 'unauthenticated' });

const { t } = useI18n();

const apiUrl = useApiUrl();

const faqList = [
	{
		title: 'Can i sign up as professional without being register on OCF?',
		body: 'Yes! you can sign up without being register on OCF.',
	},
	{
		title: 'Do I need to pay later for the account?',
		body: 'No! the account is totally free and you can use as much as you want.',
	},
	{
		title: 'Do i need to have auto-renew enabled?',
		body: 'No! the subscriptions is one time pay for the specified amount fo time. At the end of that period your subscription will auotmaticaly renew for nother similar period of time. However, you can revoke the auto renewal at any point.',
	},
];

const steps = ref<StepperStep[]>([
	{ name: 'account', status: 'active' },
	{ name: 'details', status: 'idle' },
	{ name: 'preferences', status: 'idle' },
]);

const errors = ref<string[]>([]);
const submitting = ref(false);
const activeStepNumber = ref(0);
const activeStep = computed(() => steps.value.at(activeStepNumber.value));
const allStepsData = ref<any>({});

function setStepData(data: object) {
	allStepsData.value = { ...allStepsData.value, ...data };
	moveToNextStep();
}

function moveToNextStep() {
	if (!activeStep.value) return;

	activeStep.value.status = 'completed';
	activeStepNumber.value += 1;

	if (activeStepNumber.value < steps.value.length) {
		activeStep.value.status = 'active';
	}

	window.scrollTo({ top: 0, behavior: 'smooth' });
}

function back(data: object) {
	allStepsData.value = { ...allStepsData.value, ...data };
	activeStepNumber.value--;
}

async function onSubmit(data: object) {
	allStepsData.value = { ...allStepsData.value, ...data };

	submitting.value = true;

	try {
		await $fetch<{ jwt: string; user: any }>(apiUrl('auth/local/register'), {
			method: 'POST',
			body: {
				...allStepsData.value,
				companyNetwork: allStepsData.value.companyNetwork || undefined,
				bank: allStepsData.value.bank || undefined,
				username: allStepsData.value.email,
				email: allStepsData.value.email,
				password: crypto.randomUUID(),
				type: 'regular',
			},
		});

		moveToNextStep();
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
