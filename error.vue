<template>
	<DefaultLayout>
		<h1 class="py-4 text-3xl">{{ error?.message }}</h1>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div v-if="stack" class="bg-grey-100 p-3" v-html="stack" />
		<div class="py-4">
			<NuxtLink to="/" class="text-red-100">Back to home</NuxtLink>
		</div>
	</DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '~/layouts-extended/default.layout.vue';

const router = useRouter();
const error = useError();
const stack = import.meta.env.DEV ? (error.value as any)?.stack : undefined;

const unsubscribe = router.beforeResolve(() => {
	clearError();
	unsubscribe();
});
</script>
