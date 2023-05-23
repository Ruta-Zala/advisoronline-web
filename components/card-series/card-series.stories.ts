import { Meta, StoryObj } from '@storybook/vue3';
import { faker } from '@faker-js/faker';
import Component, {
	CardSeriesProps as ComponentProps,
} from './card-series.component.vue';
import { decoratorColumns } from '~~/utils/storybook';
import { themeVariantArgType } from '~/constants/theme-variant';

export default {
	title: 'Components / Card Series',
	component: Component,
	parameters: { layout: 'none' },
	argTypes: { variant: themeVariantArgType },
	decorators: [decoratorColumns(3)],
} satisfies Meta<ComponentProps>;

export const CardSeries: StoryObj<ComponentProps> = {
	args: {
		url: '#',
		title: faker.lorem.sentence(),
		description: faker.lorem.paragraph(),
		image: faker.image.abstract(200, 50),
		count: 13,
		variant: 'dark',
	},
};
