<template>
	<AdvisorDialog
		class="z-20"
		:model-value="modelValue"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<AdvisorDialogOverlay class="bg-dark-400/95" />
		<AdvisorDialogPanelTwo class="text-white-100">
			<button
				class="m-y-auto right-10 top-10 mb-10 rounded-full border border-white-100/80 p-3.5 duration-75 hover:border-white-100 lg:absolute lg:m-0"
				@click="$emit('update:modelValue', false)"
			>
				<IconClose class="h-2.5 w-2.5" />
			</button>
			<div
				class="relative mb-16 max-h-[247px] w-full max-w-[966px] overflow-hidden"
			>
				<img :src="adImage" class="h-full w-full object-cover" alt="" />
				<div
					class="absolute inset-0 flex items-center justify-center bg-dark-300/80 text-white-100"
				>
					{{ t('shared.ad-space') }}
				</div>
			</div>
			<div
				class="relative flex w-full max-w-3xl justify-between border-b border-white-100 pb-2"
			>
				<input
					v-model="variables.search"
					type="text"
					:placeholder="t('search.for')"
					class="w-full border-none bg-dark-400/0 p-0 font-serif text-[26px] placeholder:text-white-100/50 hover:placeholder:text-white-100/70 focus:ring-0"
				/>
				<button @click="refetch()">
					<IconSearch
						class="absolute bottom-1/2 right-4 h-4 w-4 translate-x-1/2"
					/>
				</button>
			</div>
			<div class="mt-3 w-full max-w-3xl divide-y divide-white-100/20">
				<LocalScope
					v-slot="{ classes }"
					classes="block py-4 text-left font-extralight tracking-wide opacity-90 duration-75 hover:opacity-100"
				>
					<span v-if="loading" :class="classes">
						{{ t('shared.loading') }}
					</span>
					<span v-else-if="error" :class="classes">
						{{ t('error.something-went-wrong') }}
					</span>
					<span v-else-if="searchResults.length === 0" :class="classes">
						{{ t('shared.no-results') }}
					</span>
					<a
						v-for="searchResult in searchResults"
						v-else
						:key="searchResult.url"
						:href="searchResult.url"
						:class="classes"
					>
						{{ searchResult.text }}
					</a>
				</LocalScope>
			</div>
		</AdvisorDialogPanelTwo>
	</AdvisorDialog>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import IconClose from '~/icons/icon-close.component.vue';
import IconSearch from '~/icons/icon-search.component.vue';
import AdvisorDialog from '~/components/advisor-dialog/advisor-dialog.component.vue';
import AdvisorDialogPanelTwo from '~/components/advisor-dialog/advisor-dialog-panel-two.component.vue';
import AdvisorDialogOverlay from '~/components/advisor-dialog/advisor-dialog-overlay.component.vue';
import { getFakeImage } from '~/utils/get-fake-image';
import LocalScope from '~/components/local-scope/local-scope.component.vue';
import { SearchModalDocument } from './search-modal.query';

defineProps<{ modelValue: boolean }>();
defineEmits(['update:modelValue']);

const { t } = useI18n();
const adImage = getFakeImage();
const variables = reactive({
	search: '',
});

const { loading, error, result, refetch } = useQuery(
	SearchModalDocument,
	variables,
	{
		debounce: 700,
	},
);

const searchResults = computed(() => {
	const articles = (result.value?.contents?.data ?? []).filter(isValidEntity);
	return articles.map((article) => ({
		text: article.attributes.title,
		url: getContentUrl(article),
	}));
});
</script>
