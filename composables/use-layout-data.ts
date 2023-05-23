import { LayoutDocument } from '~/pages/graphql/queries/layout.query';
import { computed } from 'vue';

export async function useLayoutData() {
	const { data } = await useAsyncQuery(LayoutDocument);

	const headerMenu = computed(() => {
		return (data.value?.headerMenu ?? []).filter(Boolean);
	});

	const footerMenu = computed(() => {
		return (data.value?.footerMenu ?? []).filter(Boolean);
	});

	return { headerMenu, footerMenu };
}
