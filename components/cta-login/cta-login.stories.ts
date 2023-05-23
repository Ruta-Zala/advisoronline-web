import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import Block from './cta-login.component.vue';

export default {
	title: 'Components / Cta Login',
	component: Block,
} satisfies Meta;

const html = String.raw;

export const CtaLogin: StoryFn = () => {
	return defineComponent({
		components: { Block },
		template: html` <Block variant="dark" />`,
	});
};
