<template>
	<div class="relative pt-2.5 md:pt-4 lg:mt-8 lg:pt-8">
		<div class="container px-0">
			<PartnerHeader :image="image" :title="title" />
			<PartnerTabs v-model="activeTabIndex" :tabs="tabsTitles" variant="dark" />
		</div>
		<template v-if="activeTab">
			<Suspense>
				<component
					:is="activeTab.component"
					:key="activeTab.title"
					:data="activeTab.data"
				>
					<ProfessionalSidebar
						:ad-image="adImage"
						:contacts-information="contactsInformation"
						:key-peoples="keyPeople"
					/>
				</component>

				<template #fallback>
					<Container>
						<div class="row">
							<div class="w-full lg:col-9">Loading...</div>
							<div class="w-full lg:col-3">
								<ProfessionalSidebar
									:ad-image="adImage"
									:contacts-information="contactsInformation"
									:key-peoples="keyPeople"
								/>
							</div>
						</div>
					</Container>
				</template>
			</Suspense>
		</template>
	</div>
</template>
<script lang="ts" setup>
import ProfessionalSidebar from './components/sidebar.component.vue';
import InsightTab from './components/insight-tab.component.vue';
import GeneralTab from './components/general-tab.component.vue';
import PartnerTabs from '~/components/partner-tabs/partner-tabs.component.vue';
import PartnerHeader from './components/partner-header.component.vue';
import { PartnersDetailsDocument } from './[partnerSlug].query';
import Container from '~/components/container/container.component.vue';

definePageMeta({ layout: 'professional' });

const { t } = useI18n();
const route = useRoute();

const { data, error } = await useAsyncQuery(
	PartnersDetailsDocument,
	reactive({ partnerSlug: route.params.partnerSlug }),
);

if (error.value) {
	globalThis.console.dir(error.value);
	throw createError({
		statusCode: 500,
		statusMessage: t('error.something-went-wrong'),
	});
}

const partner = computed(() => data.value?.siteManagerPartners?.data.at(0));
const isProfessionalEnabled = partner.value?.attributes?.professionalEnabled;

if (
	!hasRefValue(partner) ||
	!isValidEntity(partner.value) ||
	!isProfessionalEnabled
) {
	throw createError({
		statusCode: 404,
		statusMessage: t('error.partner-not-found'),
	});
}

const title = computed(() => partner.value?.attributes?.title || '');
const image = computed(() =>
	getImageUrl(partner.value?.attributes?.logo?.data),
);

const insightsTabs = computed(() => {
	const entities = partner.value.attributes?.cornerManagement?.insights ?? [];
	const activeEntities = entities
		.filter(Boolean)
		.filter((i) => i.active)
		.filter((i) => i.content_list?.data?.attributes?.name);

	return activeEntities.map((insight) => ({
		title: insight.tab_title || t('professional.tab.insights'),
		component: InsightTab,
		data: insight,
	}));
});

const generalTab = {
	title: t('professional.tab.general'),
	component: GeneralTab,
	data: data.value,
};

const tabs = computed(() => [generalTab, ...insightsTabs.value]);
const tabsTitles = computed(() => tabs.value.map((tab) => tab.title));
const activeTabIndex = ref(0);
const activeTab = computed(() => tabs.value[activeTabIndex.value]);

const adImage = computed(() =>
	getImageUrl(partner.value?.attributes?.customAdSpace?.data),
);

const contactsInformation = computed(() => {
	const contact = partner.value?.attributes?.contactsInformation;
	return {
		title: contact?.title || '',
		location: contact?.address || '',
		phone: contact?.phoneNumber || '',
		email: contact?.email || '',
		website: contact?.website || '',
		linkedIn: contact?.linkedinUrl || '',
	};
});

const keyPeople = computed(() => {
	const people = partner.value?.attributes?.keyPeople ?? [];
	return people.map((person) => {
		const personImg = person?.profileImage?.data?.attributes;
		return {
			id: person?.id || '',
			name: `${person?.firstName} ${person?.lastName}`,
			role: person?.role || '',
			phone: person?.phoneNumber || '',
			email: person?.email || '',
			profilePic: personImg?.url || personImg?.alternativeText || '',
		};
	});
});
</script>
