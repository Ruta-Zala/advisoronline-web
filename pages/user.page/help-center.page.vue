<template>
	<ProfileLayout
		:breadcrumbs-args="breadcrumbsArgs"
		:header="t('help-center.header')"
		:sub-header="t('help-center.subheader')"
	>
		<GuideStepper v-model="isOpen" />
		<div class="pb-8">
			<BlockHeader
				:title="t('help-center.guide-tour')"
				:hide-underline="false"
				class="mb-8"
			/>
			<button
				class="flex items-center gap-2 bg-red-100 px-10 py-4 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
				@click="isOpen = true"
			>
				<IconPlay class="h-5 w-5" />
				{{ t('help-center.replay-guide-tour') }}
			</button>
			<BlockHeader
				:title="t('shared.faqs')"
				:hide-underline="false"
				class="mt-10"
			/>
			<div class="divide-y divide-grey-100">
				<Accordion
					v-for="item in faqList"
					:key="item.title"
					:title="item.title"
				>
					{{ item.body }}
				</Accordion>
			</div>
			<BlockHeader
				:title="t('help-center.customer-support')"
				:hide-underline="false"
				class="my-8"
			/>
			<div class="flex flex-wrap">
				<div class="w-full">
					<SelectField
						id="contactSubject"
						v-model="contactSubject"
						:options="[
							{
								text: t('help-center.general-information'),
								value: '',
							},
						]"
						:placeholder="t('help-center.contact-subject')"
					></SelectField>
				</div>
				<div class="my-6 w-full">
					<textarea
						class="w-full resize-none placeholder:text-sm placeholder:font-semibold placeholder:text-dark-300"
						:placeholder="t('help-center.your-message')"
						rows="5"
					></textarea>
				</div>
				<div class="flex w-full items-end justify-end">
					<button
						class="bg-red-100 px-12 py-4 text-xs font-semibold uppercase text-white-100 hover:bg-red-200"
					>
						{{ t('help-center.send-email') }}
					</button>
				</div>
			</div>
		</div>
	</ProfileLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { IconPlay } from '~/icons';
import ProfileLayout from '~/layouts-extended/profile.layout.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';
import GuideStepper from '~/components/guide-stepper/guide-stepper.component.vue';
import Accordion from '~/components/accordion/accordion.component.vue';
import SelectField from '~/components/select-field/select-field.component.vue';
definePageMeta({
	layout: false,
});

const { t } = useI18n();
const breadcrumbsArgs = {
	list: [
		{
			name: t('shared.account'),
			url: '#',
		},
	],
	current: t('help-center.title'),
};

const isOpen = ref(false);

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

const contactSubject = ref();
</script>
