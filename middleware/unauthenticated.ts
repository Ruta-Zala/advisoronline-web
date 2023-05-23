export default defineNuxtRouteMiddleware(async () => {
	const token = useCookie('apollo:default.token');

	if (token.value) {
		return navigateTo('/user');
	}
});
