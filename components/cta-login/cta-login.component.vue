<template>
	<div
		:class="[
			{
				'bg-dark-100 text-white-100': variant === 'dark',
				'bg-white-100 text-dark-100': variant === 'white',
			},
			'relative',
			'flex flex-col items-center justify-center',
			'p-5 text-center text-white-100 md:px-12',
		]"
	>
		<IconLock class="mb-6 h-20 w-20" />
		<h2 class="font-serif text-[26px] font-bold tracking-wide">
			{{ t('cta-login.description') }}
		</h2>
		<hr class="my-4 w-20" />
		<p class="mb-5 text-[13px] font-semibold leading-7 tracking-wide">
			{{ t('cta-login.short-description') }}<br />
		</p>
		<hr class="my-2 w-20" />
		<ul class="my-4 list-disc text-left text-[13px]">
			<li>{{ t('cta-login.features.access-free') }}</li>
			<li>{{ t('cta-login.features.read-exclusive') }}</li>
			<li>{{ t('cta-login.features.follow-news') }}</li>
			<li>{{ t('cta-login.features.receive-notifications') }}</li>
			<li>
				{{ t('cta-login.features.exclusive-events') }}
			</li>
			<li>
				{{ t('cta-login.features.new-analysis') }}
			</li>
		</ul>

		<hr class="my-2 w-20" />
		<h2 class="my-4 font-serif text-[26px] font-bold tracking-wide">
			{{ t('cta-login.sign-up') }}
		</h2>
		<a
			href="/auth/login"
			class="block border border-white-100 px-9 py-4 text-xs font-medium tracking-wider"
			>{{ t('cta-login.have-account') }}</a
		>
	</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconLock from '~/icons/icon-unlock.component.vue';

export interface CtaLoginProps {
	variant?: 'white' | 'dark';
}

const { t } = useI18n();

defineProps<CtaLoginProps>();
</script>
