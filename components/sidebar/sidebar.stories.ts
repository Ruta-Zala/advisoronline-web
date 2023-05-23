import { Meta, StoryObj } from '@storybook/vue3';
import Component, { SidebarProps } from './sidebar.component.vue';
import { faker } from '@faker-js/faker';
import { categoriesMock } from '~/utils/categories';

export default {
	title: 'Components / Sidebar',
	component: Component,
	args: {
		isSidebarOpen: true,
		subscribeUrl: '',
		magazineUrl: '',
		signinUrl: '',
		categories: categoriesMock,
		user: {
			name: 'Sara Doe',
			picture: faker.image.abstract(),
		},
	},
} satisfies Meta<SidebarProps>;

export const Sidebar: StoryObj<SidebarProps> = {};
