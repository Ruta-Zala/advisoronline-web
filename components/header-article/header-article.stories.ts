import { Meta } from '@storybook/vue3';
import Block, { HeaderArticleProps } from './header-article.component.vue';
import { createDefaultStory } from '~/utils/storybook';

export default {
	title: 'Components / Header Article',
	component: Block,
	args: {
		title: 'Fondi comuni, tra i sottoscrittori sempre più numerose le donne',
		readingTime: 30,
		date: '05/05/2022',
		author: 'Paola Priest',
	},
} satisfies Meta<HeaderArticleProps>;

export const HeaderArticle = createDefaultStory(Block);
