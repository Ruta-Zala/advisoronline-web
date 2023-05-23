<template>
	<img :src="adImage" :alt="adImage" class="mb-8 h-[251px] w-[300px]" />
	<BlockHeader :title="t('shared.contacts')" />
	<h3 class="mb-4 mt-8 text-sm font-semibold">
		{{ contactsInformation.title }}
	</h3>
	<ContactCard v-if="contactsInformation" v-bind="contactsInformation" />
	<hr class="my-6 w-full text-grey-100" />
	<div v-for="person in keyPeoples" :key="person.id" class="my-6">
		<PersonInfo v-bind="person" />
	</div>

	<div
		class="container-cancel relative h-[300px] lg:container-cancel-none lg:h-[600px]"
	>
		<SubscribeNewsletterSidebar
			v-if="!userInfo?.newsletterEnabled"
			:title="t('subscribe-newsletter.title')"
			:subtitle="t('subscribe-newsletter-sidebar.subtitle')"
			:subscribe-link="getSubscribeLink(userInfo)"
		/>
	</div>
</template>
<script lang="ts" setup>
import BlockHeader from '~/components/block-header/block-header.component.vue';
import ContactCard from '~/components/contact-card/contact-card.component.vue';
import SubscribeNewsletterSidebar from '~/components/subscribe-newsletter-sidebar/subscribe-newsletter-sidebar.component.vue';
import PersonInfo from '~/components/person-info/person-info.component.vue';

interface ProfessinalSideBarProps {
	adImage: string;
	contactsInformation: {
		title: string;
		location: string;
		phone: string;
		email: string;
		website?: string;
		linkedIn?: string;
	};
	keyPeoples: Array<{
		id: string;
		name: string;
		role: string;
		phone: string;
		email: string;
		profilePic: string;
	}>;
}

defineProps<ProfessinalSideBarProps>();

const { t } = useI18n();
const userInfo = useUserInfo();
</script>
