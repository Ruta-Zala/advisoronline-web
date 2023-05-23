import { useApollo, useUserInfo } from '#imports';

function useGlobalSettings() {
	const userInfo = useUserInfo();
	const { onLogout } = useApollo();

	const subscribeUrl = ref('/auth/register?subscribe=true');
	const signinUrl = ref('/auth/login');
	const magazineUrl = ref('#');
	const isSidebarOpen = ref(false);
	const isTagsModalOpen = ref(false);
	const isSearchModalOpen = ref(false);

	const user = computed(() => {
		if (!userInfo.value) return undefined;
		const { firstName, lastName, username, email } = userInfo.value;
		const maybeNames = [firstName, lastName].filter(Boolean);
		const fullName = maybeNames.length ? maybeNames.join(' ') : undefined;
		const name = fullName ?? username ?? email ?? 'No Name';
		return { name, email };
	});

	return {
		subscribeUrl,
		signinUrl,
		magazineUrl,
		isSidebarOpen,
		isTagsModalOpen,
		isSearchModalOpen,
		user,
		toggleSidebar(open: boolean) {
			isSidebarOpen.value = open;
		},
		toggleTagsModal(open: boolean) {
			isTagsModalOpen.value = open;
		},
		toggleSearchModal(open: boolean) {
			isSearchModalOpen.value = open;
		},
		signOut() {
			userInfo.value = null;
			onLogout();
			// Do a full refresh just to make sure the entire state was reset
			window.location.pathname = '/';
		},
	};
}

export default defineNuxtPlugin(() => {
	return {
		provide: {
			globalSettings: useGlobalSettings(),
		},
	};
});

declare module '#app' {
	interface NuxtApp {
		$globalSettings: ReturnType<typeof useGlobalSettings>;
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$globalSettings: ReturnType<typeof useGlobalSettings>;
	}
}
