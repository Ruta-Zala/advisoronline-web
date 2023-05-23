import { Meta, StoryObj } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Block, { QuickJumpProps } from './quick-jump.component.vue';
import { decoratorColumns } from '~/utils/storybook';

export default {
	title: 'Components / Quick Jump',
	component: Block,
	parameters: { layout: 'none' },
	decorators: [decoratorColumns(4)],
} satisfies Meta<QuickJumpProps>;

export const QuickJump: StoryObj<QuickJumpProps> = {
	args: {
		title: 'Up & Down',
		description: `An ironic and direct conversation between the conductor and the guest inside an elevator. A close`,
		image: faker.image.abstract(),
		url: '#',
	},
};
