import { ref, onMounted, onUnmounted } from 'vue';

export function useHasScrolled() {
	const hasScrolled = ref(false);
	function onScroll() {
		const documentElement = document.documentElement;
		const scrollTop = document.body.scrollTop || documentElement.scrollTop;
		const height = documentElement.scrollHeight - documentElement.clientHeight;
		const scrolledPercentage = Math.round((scrollTop / height) * 100);
		hasScrolled.value = scrolledPercentage > 0;
	}
	onMounted(() =>
		window.addEventListener('scroll', onScroll, { passive: true }),
	);
	onUnmounted(() => window.removeEventListener('scroll', onScroll));
	return hasScrolled;
}
