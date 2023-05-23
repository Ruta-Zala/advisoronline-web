<template>
	<ProfileLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('edit-profile.shared.header')"
		:sub-header="t('edit-profile.subheader')"
	>
		<form class="pb-8" @submit="onSubmit">
			<BlockHeader
				:title="t('edit-profile.personal-details')"
				:hide-underline="false"
				class="mb-10"
			/>

			<div class="space-y-4">
				<div class="row space-y-4 md:space-y-0">
					<div class="col-12 md:col-6">
						<Field
							v-slot="{ field, errorMessage }"
							name="firstName"
							:rules="isRequired"
						>
							<TextField
								id="firstName"
								v-bind="field"
								:label="t('shared.name')"
								:model-value="field.value as string"
								@update:model-value="temporaryOnChange(field, $event)"
							></TextField>
							<span class="text-red-100">{{ errorMessage }}</span>
						</Field>
					</div>
					<div class="col-12 md:col-6">
						<Field
							v-slot="{ field, errorMessage }"
							name="lastName"
							:rules="isRequired"
						>
							<TextField
								id="lastName"
								:label="t('shared.surname')"
								:model-value="field.value as string"
								@update:model-value="temporaryOnChange(field, $event)"
							></TextField>
							<span class="text-red-100">{{ errorMessage }}</span>
						</Field>
					</div>
				</div>

				<Field
					v-slot="{ field, errorMessage }"
					name="email"
					:rules="isRequired"
				>
					<TextField
						id="email"
						readonly
						:label="t('shared.email')"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></TextField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<Field
					v-slot="{ field, errorMessage }"
					name="mobile"
					:rules="isRequired"
				>
					<TextField
						id="mobile"
						:label="t('edit-profile.phone')"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></TextField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<Field
					v-slot="{ field, errorMessage }"
					name="gender"
					:rules="isRequired"
				>
					<SelectField
						id="gender"
						:options="genders"
						:placeholder="t('shared.gender')"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></SelectField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>
			</div>

			<BlockHeader
				:title="t('edit-profile.professional-details')"
				:hide-underline="false"
				class="my-10"
			/>

			<div class="space-y-4">
				<Field
					v-slot="{ field, errorMessage }"
					name="personalEmail"
					:rules="[isRequired, isEmail]"
				>
					<TextField
						id="personalEmail"
						:label="t('shared.professional-email')"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></TextField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<p class="text-[13px] font-normal text-dark-100">
					{{ t('shared.professional-email.text.part1') }}
					<span class="font-semibold">
						{{ t('shared.professional-email.text.part2') }}
					</span>
					{{ t('shared.professional-email.text.part3') }}
					<span class="underline">
						{{ t('shared.professional-email.text.part4') }}
					</span>
				</p>

				<!-- TODO: Check if we need this field here-->
				<Field
					v-if="false"
					v-slot="{ field, errorMessage }"
					name="professionalArea"
					:rules="isRequired"
				>
					<SelectField
						id="professionalArea"
						:options="[
							{ text: t('edit-profile.professional-area'), value: '' },
						]"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></SelectField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<!-- TODO: Find out why is not loaded -->
				<Field
					v-if="false"
					v-slot="{ field, errorMessage }"
					name="network"
					:rules="isRequired"
				>
					<SelectField
						id="network"
						:options="companyNetworksOptions"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></SelectField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<!-- TODO: Find out why is not loaded -->
				<Field
					v-if="false"
					v-slot="{ field, errorMessage }"
					name="bank"
					:rules="isRequired"
				>
					<SelectField
						id="bank"
						:options="banksOptions"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></SelectField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<Field
					v-slot="{ field, errorMessage }"
					name="managerType"
					:rules="isRequired"
				>
					<SelectField
						id="managerType"
						:options="managerTypesOptions"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></SelectField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<Field
					v-slot="{ field, errorMessage }"
					name="promoterSince"
					:rules="isRequired"
				>
					<SelectField
						id="promoterSince"
						:options="promoterSinceOptions"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></SelectField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<Field
					v-slot="{ field, errorMessage }"
					name="province"
					:rules="isRequired"
				>
					<SelectField
						id="province"
						:options="provincesOptions"
						:model-value="field.value as string"
						@update:model-value="temporaryOnChange(field, $event)"
					></SelectField>
					<span class="text-red-100">{{ errorMessage }}</span>
				</Field>

				<div class="flex justify-end">
					<button
						:disabled="isSubmitting"
						type="submit"
						class="bg-red-100 p-3 px-12 py-3 font-semibold text-white-100 hover:bg-red-200 disabled:opacity-80"
					>
						<IconSpinner
							v-if="isSubmitting"
							class="mr-3 inline h-4 w-4 animate-spin"
						/>
						{{ t('shared.save') }}
					</button>
				</div>
			</div>
		</form>
	</ProfileLayout>
</template>

<script lang="ts" setup>
import { Field, useForm } from 'vee-validate';
import { email, required } from '@vee-validate/rules';
import ProfileLayout from '~/layouts-extended/profile.layout.vue';
import { IconSpinner } from '~/icons';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import TextField from '~/components/text-field/text-field.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
import { StrapiResponse, User } from '~/utils/types';
import { RegisterFieldsDocument } from '../auth/components/details-register-boxes.query';

definePageMeta({ layout: false });

const { data } = await useAsyncQuery(RegisterFieldsDocument);

const { t } = useI18n();
const userInfo = useUserInfo();
const apiUrl = useApiUrl();
const { getToken } = useApollo();

const breadcrumbsArgs = {
	list: [{ name: t('shared.account'), url: '#' }],
	current: t('edit-profile.shared.header'),
};

const genders = [
	{ text: t('gender.select-text'), value: '' },
	{ text: t('shared.gender.male'), value: 'male' },
	{ text: t('shared.gender.female'), value: 'female' },
];

const companyNetworksOptions = computed(() => {
	return createOptionsForDynamic(
		t('shared.select-network'),
		data.value?.companyNetworks?.data,
	);
});

const banksOptions = computed(() => {
	return createOptionsForDynamic(
		t('register.details.select-bank'),
		data.value?.banks?.data,
	);
});

const managerTypesOptions = computed(() => {
	return createOptionsForStatic(
		t('shared.kind-of-manager'),
		data.value?.managerTypes,
	);
});

const promoterSinceOptions = computed(() => {
	return createOptionsForStatic(
		t('shared.been-consultant'),
		data.value?.promoterSinceMap,
	);
});

const provincesOptions = computed(() => {
	return createOptionsForStatic(t('shared.location'), data.value?.provinces);
});

const { handleSubmit, isSubmitting } = useForm({
	initialValues: {
		firstName: userInfo.value?.firstName || '',
		lastName: userInfo.value?.lastName || '',
		email: userInfo.value?.email || '',
		mobile: userInfo.value?.mobile || '',
		gender: userInfo.value?.gender || '',
		personalEmail: userInfo.value?.personalEmail || '',
		// TODO: Find out why bank and network are not loaded
		// network: companyNetworksOptions.value[0]?.value,
		// bank: banksOptions.value[0]?.value,
		managerType: userInfo.value?.managerType || '',
		promoterSince: userInfo.value?.promoterSince || '',
		province: userInfo.value?.workProvince || '',
	},
});

const onSubmit = handleSubmit(async (values) => {
	try {
		const token = await getToken();
		userInfo.value = await $fetch<User>(apiUrl('users/me'), {
			method: 'PUT',
			headers: { Authorization: `Bearer ${token}` },
			body: values,
		});
	} catch (e) {
		if (!isFetchError<StrapiResponse>(e)) throw e;
	}
});

function isRequired(value: unknown) {
	return required(value) || t('shared.validation.required');
}

function isEmail(value: unknown) {
	return email(value) || t('shared.validation.email');
}

// TODO: https://github.com/logaretm/vee-validate/issues/4223#issuecomment-1516601086
function temporaryOnChange(field: any, $event: any) {
	field.onChange.map((cb: any) => cb($event));
}
</script>
