<template>
	<div class="container">
		<div class="w-full space-y-12">
			<div class="space-y-6 text-center">
				<Breadcrumbs v-bind="breadcrumbsArgs" />
				<HeaderArticle v-bind="headerArticle" class="mb-10" />
			</div>
			<div
				v-for="section in faqContent.sections"
				:key="section.id"
				class="mx-auto space-y-4 lg:w-2/3"
			>
				<IconLight class="mx-auto h-10 w-10" />
				<h1 class="text-center text-[26px]">{{ section.title }}</h1>
				<div class="divide-y divide-grey-100">
					<Accordion
						v-for="item in section.items"
						:key="item.title"
						:title="item.title"
					>
						<Markup :html="item.body" />
					</Accordion>
				</div>
			</div>
			<div class="mx-auto space-y-4 border border-grey-100 py-8 lg:w-2/3">
				<IconWheel class="mx-auto h-14 w-14 text-grey-100" />
				<h1 class="text-center font-serif text-[21px] font-bold">
					{{ t('faqs.assistance') }}
				</h1>
				<div class="mx-auto my-4 w-20 border-b border-red-100"></div>
				<p class="text-center text-sm">
					{{ t('faqs.contact-through') }}
				</p>
				<div class="px-8">
					<a
						:href="'mailto:' + faqContent.contactEmail"
						class="flex w-full justify-center bg-dark-100 p-3 text-center font-semibold text-white-100 hover:bg-dark-200"
					>
						{{ faqContent.contactEmail }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import HeaderArticle from '~/components/header-article/header-article.component.vue';
import Accordion from '~/components/accordion/accordion.component.vue';
import Markup from '~/components/markup/markup.component.vue';
import { IconLight, IconWheel } from '~/icons';
import { FaqsDocument } from './faqs.query';

const { t } = useI18n();
const { data, error } = await useAsyncQuery(FaqsDocument);

if (error.value) {
	throw createError(error.value);
}

const dateFormat = useDateFormatter();

const breadcrumbsArgs = {
	list: [{ name: t('shared.advisor'), url: '#' }],
	current: t('faqs.name'),
};

const faqContent = computed(() => {
	const faqsPage = data.value?.siteManagerFaq?.data;
	const title = faqsPage?.attributes?.title;
	const contactEmail = faqsPage?.attributes?.contactEmail;
	const date = faqsPage?.attributes?.updatedAt
		? new Date(faqsPage?.attributes?.updatedAt)
		: new Date();
	const sections = faqsPage?.attributes?.sections?.map((section) => ({
		id: section?.id,
		title: section?.title,
		items: (section?.items ?? [])
			.filter((item) => item?.active)
			.map((item) => ({
				title: item?.title ?? '',
				body: item?.text ?? '',
			})),
	}));

	return {
		title: title,
		contactEmail: contactEmail,
		publishedAt: date,
		sections: sections,
	};
});

const headerArticle = {
	title: faqContent.value.title ?? t('shared.faqs'),
	readingTime: readingTime(JSON.stringify(faqContent.value)),
	date: dateFormat(faqContent.value.publishedAt),
};
</script>
