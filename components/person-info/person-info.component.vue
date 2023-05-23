<template>
	<div class="flex gap-4">
		<img :src="profilePic" class="h-[120px] w-[92px] object-cover" />
		<div>
			<h6 class="mb-0.5 font-serif text-lg font-light tracking-wider">
				{{ name }}
			</h6>
			<p class="mb-2 text-[13px] tracking-wide">{{ role }}</p>
			<div class="mb-2 flex items-center gap-2 text-grey-500">
				<IconPhone class="h-4 w-4" />
				<p class="text-[13px] tracking-wide">{{ phone }}</p>
			</div>
			<div class="flex items-center gap-2 text-grey-500">
				<IconMail class="h-4 w-4" />
				<p class="break-all text-[13px] tracking-wide">{{ email }}</p>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import IconPhone from '~/icons/icon-phone.component.vue';
import IconMail from '~/icons/icon-mail.component.vue';

export interface PersonInfoProps {
	name: string;
	role: string;
	phone: string;
	email: string;
	profilePic: string;
}

defineProps<PersonInfoProps>();
</script>
