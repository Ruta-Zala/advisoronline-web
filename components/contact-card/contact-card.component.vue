<template>
	<ul class="space-y-3 text-[13px]">
		<li v-for="(item, index) in items" :key="index" class="space-x-2">
			<component
				:is="item.link ? 'a' : 'span'"
				:href="item.link"
				class="flex items-center gap-2"
			>
				<component :is="item.icon" class="ml-[-3px] h-6 w-6" />
				<span>{{ item.text }}</span>
			</component>
		</li>
	</ul>
</template>
<script lang="ts" setup>
import {
	IconLocationMarker,
	IconPhone,
	IconMail,
	IconLink,
	IconLinkedin,
} from '~/icons';

export interface ContactCardProps {
	location: string;
	phone: string;
	email: string;
	website?: string;
	linkedIn?: string;
}

const props = defineProps<ContactCardProps>();

const icons = {
	location: IconLocationMarker,
	phone: IconPhone,
	email: IconMail,
	website: IconLink,
	linkedIn: IconLinkedin,
};

const types = {
	phone: 'tel',
	email: 'mail',
	website: 'link',
	linkedIn: 'link',
};

const items = computed(() => {
	return Object.entries(props)
		.filter(([_, v]) => Boolean(v))
		.map(([k, v]) => {
			const type = types[k as keyof typeof types];

			let link = undefined;
			if (type === 'tel') link = `tel:${v}`;
			if (type === 'mail') link = `mailto:${v}`;
			if (type === 'link') link = v;

			return {
				text: v,
				icon: icons[k as keyof typeof icons],
				link,
			};
		});
});
</script>
