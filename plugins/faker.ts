import { faker } from '@faker-js/faker';

export default defineNuxtPlugin(() => {
	faker.seed(0);
});
