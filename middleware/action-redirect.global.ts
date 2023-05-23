export default defineNuxtRouteMiddleware((to) => {
	if (!to.path.endsWith('.action')) return;
	const noAction = to.path.replace(/\.action$/, '');
	return navigateTo(noAction, { redirectCode: 301 });
});
