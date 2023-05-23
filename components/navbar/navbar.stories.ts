import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent } from 'vue';
import { faker } from '@faker-js/faker';
import Block, { NavbarProps } from './navbar.component.vue';
import { categoriesMock } from '~/utils/categories';

export default {
	title: 'Components / Navbar',
	component: Block,
	parameters: { layout: 'none' },
	args: {
		date: 'Friday, May 06, 2022',
		categories: categoriesMock,
		subscribeUrl: '#',
		magazineUrl: '#',
		signinUrl: '#',
		user: {
			name: 'Sara Doe',
			picture: faker.image.abstract(),
		},
	},
} satisfies Meta<NavbarProps>;

const html = String.raw;

export const Navbar: StoryFn = (args) => {
	return defineComponent({
		components: { Block },
		setup: () => ({ args }),
		template: html`
			<div class="h-[10000px]">
				<Block v-bind="args" />
			</div>
		`,
	});
};
