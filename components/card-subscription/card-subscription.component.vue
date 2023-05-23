<template>
	<div class="flex flex-col">
		<div
			:class="{
				'border-red-100': consumerChoice,
				'border-grey-100/70': !consumerChoice,
			}"
			class="relative border-x-2 border-t-2 bg-white-100 px-5 py-7 text-center md:px-7"
		>
			<div
				v-if="consumerChoice"
				class="absolute left-[-2px] top-[-20px] flex items-center justify-center gap-2 bg-red-100 px-5 py-2 text-white-100"
			>
				<IconSparkles class="h-5 w-5" />
				<h3 class="text-[13px] font-light tracking-wide">
					{{ t('shared.consumer-choice') }}
				</h3>
			</div>
			<h2 class="mb-8 font-serif text-[26px] font-bold">{{ name }}</h2>
			<p class="mb-10 px-4 text-sm tracking-wide">
				{{ selected ? stripHtml(selected.description) : '&nbsp;' }}
			</p>
			<RadioGroup v-model="selected">
				<RadioGroupOption
					v-for="option in propsOptions"
					:key="option.id"
					v-slot="{ checked }"
					:value="option"
					:disabled="option.disabled"
					:class="{ 'opacity-50': option.disabled }"
					class="mb-8 flex cursor-pointer items-center gap-4 text-left text-sm"
				>
					<div
						:class="{
							'border border-grey-100': !checked,
							'bg-red-100': checked,
						}"
						class="relative h-4 w-4 rounded"
					>
						<div
							v-if="checked"
							class="absolute bottom-1/2 right-1/2 h-6 w-6 translate-x-1/2 translate-y-1/2 rounded-md border-2 border-red-100"
						/>
					</div>
					<p v-if="option.disabled" class="font-semibold">
						{{ t('shared.option-not-available', { option: option.text }) }}
					</p>
					<p v-else class="font-semibold">
						{{ option.text }}
					</p>
				</RadioGroupOption>
			</RadioGroup>
			<div class="mb-7 flex flex-wrap items-center gap-4">
				<Switch
					v-model="printEnabled"
					:class="printEnabled ? 'bg-red-100' : 'bg-grey-100'"
					class="relative inline-flex h-8 w-16 items-center rounded-full"
					:disabled="!selected"
				>
					<span
						:class="printEnabled ? 'translate-x-9' : 'translate-x-1'"
						class="inline-block h-6 w-6 transform rounded-full bg-white-100 duration-150"
					/>
				</Switch>
				<div class="text-left">
					<h4 class="text-sm font-semibold">
						{{ t('shared.print-version') }}
					</h4>
					<p class="text-[13px] font-medium tracking-wide">
						{{ t('card-subscription.annual-subscription') }}
					</p>
				</div>
			</div>
			<button
				:class="{
					'border-red-100': selected && consumerChoice,
					'border-grey-100': !selected || !consumerChoice,
					'cursor-default': !selected,
				}"
				class="group mb-7 w-full border"
				:disabled="!selected"
				@click="subscribe"
			>
				<span
					v-if="selected"
					class="block pb-6 pt-4 font-serif text-4xl font-bold"
				>
					€ {{ selected.price }}
				</span>

				<span
					:class="{
						'bg-red-100 group-hover:bg-red-100': selected && consumerChoice,
						'bg-dark-100': selected && !consumerChoice,
						'bg-grey-100': !selected,
					}"
					class="block py-4 text-xs font-medium uppercase tracking-wider text-white-100 duration-75"
				>
					<template v-if="selected">
						{{ t('shared.subscribe-months', { count: selected.months }) }}
					</template>
					<template v-else>
						{{ t('shared.subscribe') }}
					</template>
				</span>
			</button>
			<p class="text-[13px] leading-5">
				{{ t('card-subscription.renewal-guide') }}
			</p>
		</div>
		<hr class="relative border-t-2 border-red-100" />
		<div
			v-if="contents.length"
			:class="{
				'border-red-100': consumerChoice,
				'border-grey-200': !consumerChoice,
			}"
			class="relative border-x-2 border-b-2 bg-grey-200 px-5 pb-7 pt-5 md:px-7"
		>
			<h4 class="text-sm font-semibold text-red-100">
				{{ t('card-subscription.subscription-contents') }}
			</h4>
			<div
				v-for="(item, index) in contents"
				:key="index"
				class="mt-5 flex gap-3"
			>
				<IconCheck class="h-6 w-6 text-green-2" />
				<p class="w-full text-sm font-semibold tracking-wide">{{ item }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Switch, RadioGroup, RadioGroupOption } from '@headlessui/vue';
import IconCheck from '~/icons/icon-check.component.vue';
import IconSparkles from '~/icons/icon-sparkles.component.vue';
import { stripHtml } from '~/utils/strip-html';

export interface CardSubscriptionOption {
	id: string;
	text: string;
	months: number;
	description: string;
	price: number;
	disabled: boolean;
}

export interface CardSubscriptionProps {
	name: string;
	contents: string[];
	consumerChoice: boolean;
	options: CardSubscriptionOption[];
}

const emit = defineEmits<{
	(e: 'subscribe', $event: { id: string; addPrint: boolean }): void;
}>();

const props = defineProps<CardSubscriptionProps>();
const propsOptions = toRef(props, 'options');
const { t } = useI18n();
const printEnabled = ref(false);
const selected = ref<CardSubscriptionOption | undefined>(
	propsOptions.value.find((o) => !o.disabled),
);

watch(
	propsOptions,
	(options) => {
		selected.value = options.find((o) => !o.disabled);
		printEnabled.value = false;
	},
	{ flush: 'post', deep: true },
);

function subscribe() {
	const option = selected.value;
	if (!option) return;
	emit('subscribe', { id: option.id, addPrint: printEnabled.value });
}
</script>
