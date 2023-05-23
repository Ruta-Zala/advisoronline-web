<template>
	<div>
		<div class="text-center">
			<Breadcrumbs v-bind="breadcrumbsArgs" class="mb-4" />
			<HeaderArticle v-bind="articleInfo" class="mb-3" />
		</div>
		<div class="flex justify-center text-center">
			<div class="w-full pb-8 lg:w-3/4">
				<div v-for="(content, index) in privacyContents" :key="index">
					<BlockHeader :title="content.title" class="mb-6 mt-8" />
					<p class="text-justify text-base">{{ content.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import HeaderArticle from '~/components/header-article/header-article.component.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.component.vue';
import BlockHeader from '~/components/block-header/block-header.component.vue';

const { t } = useI18n();
const breadcrumbsArgs = {
	list: [
		{
			name: t('shared.advisor'),
			url: '#',
		},
	],
	current: t('privacy.terms-conditions'),
};

const articleInfo = {
	title: 'Terms & Conditions of use',
	date: '05/05/2022',
	readingTime: 1,
};

const privacyContents = [
	{
		title: 'Terms and conditions of use of the website www.advisoronline.it',
		description: `Il sito www.advisoronline.it di proprietà di Open Financial Communication S.r.l. (di seguito "Open Financial Communication") è un servizio di informazioni on-line fornito da Open Financial Communication. Il suo utilizzo è subordinato all'accettazione dei termini e delle condizioni qui di seguito stabilite. Se non si intende accettare le presenti condizioni si è invitati a non utilizzare il sito.`,
	},
	{
		title: 'Copyright',
		description: `All the contents of the website www.advisoronline.it, including texts, documents, trademarks, logos, images, graphics, their arrangement and their adaptations are protected by the legislation on copyright and by the legislation for the protection of trademarks (Law 22 April 1941 n. 633 and subsequent amendments, Legislative Decree 9 April 2003, n. 68 and Legislative Decree 10 February 2005, n. 30) and are covered by copyright. The www.advisoronline.it site may also contain images, documents, logos and trademarks of third parties who have expressly authorized Open Financial Communication for publication on the www.advisoronline.it site. The aforementioned third-party material is also protected by copyright and trademark law and is covered by copyright. The laws, regulations,
                    Users of the site do not have the right to appropriate, reproduce, modify, translate, distribute, republish, in any form, even partial, or in any case to economically use the contents of the site or for professional and / or related purposes. or to the professional activity of others, without specific written authorization from Open Financial Communication. However, the usability of the contents for personal purposes remains free as long as the moral rights and / or property rights of the legitimate owners of the individual contents are not infringed.`,
	},
	{
		title: 'Limits of Liability',
		description: `The website www.advisoronline.it contains data, information, market rumors, columns, operational advice on a large number of financial issues. All the information and services offered are not intended in any way to constitute a solicitation to public savings or to promote any form of investment.
                    The site provides news, stock market data, graphs, technical analyzes, "fundamental" data on various financial products which, although they come from sources believed to be reliable, may at times not be correct or accurate, both due to possible technical problems. (for example in the transmission of data or in the correct functioning of some search engines) and for the possibility of errors committed unknowingly and in good faith. Under no circumstances can Open Financial Communication be held liable for any damage deriving from the use of the information contained in this site or from the contents of the site itself. Open Financial Communication reports on the website www.advisoronline.it only those news which, at its sole and unquestionable discretion, believes they deserve to be disseminated. Consequently, the information provided on the site is not exhaustive. Therefore, the site provides opinions, data and news that still need to be critically reworked by the users of the site.`,
	},
	{
		title: 'Links',
		description: `Open Financial Communication is not responsible for the content of any other site that can be reached from the site www.advisoronline.it or through which this site can be accessed. Anyone who decides to visit a site linked to the site www.advisoronline.it does so at their own risk, assuming the burden of taking all necessary measures against viruses or other destructive elements. Open Financial Communication announces that it has no control over the content of such sites and as a mere third party has no responsibility for the content and material, including advertising, disclosed on such sites or for the products or services offered. Such products or services cannot be considered sponsored, shared or supported in any way by Open Financial Communication.`,
	},
	{
		title: 'Use for lawful pruposes',
		description: `The user undertakes to use the website www.advisoronline.it and its services exclusively for lawful purposes and, in any case, without infringing the rights of any third party and paying particular attention to the data protection regulations, the laws on protection intellectual and industrial property, the protection of personal data, the current rules on cybercrime and the legislation on telecommunications.`,
	},
	{
		title: 'Cookies',
		description: `A "cookie" is a small amount of data containing an anonymous unique identification code that is sent to the user's browser from a Web server and is subsequently stored on the user's computer hard drive. The cookie is then reread and recognized only by the website that sent it each time subsequent connections are made. If the user prefers not to receive cookies, he can set his browser in such a way that it warns him of the presence of a cookie, thus being able to decide whether to accept it or not. You can also automatically refuse all cookies by activating the appropriate option in the browser. `,
	},
	{
		title: 'Privacy',
		description: `The description of the management of the www.advisoronline.it site with reference to the processing of personal data of users who consult it is described in the appropriate page called Privacy.`,
	},
	{
		title: 'Applicable law',
		description: `The conditions contained in these legal notes are governed by Italian law.`,
	},
];
</script>
