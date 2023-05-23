import { Meta, StoryFn } from '@storybook/vue3';
import { defineComponent, ref } from 'vue';
import AdvisorDialogContianer from './advisor-dialog.component.vue';
import AdvisorDialogOverlay from './advisor-dialog-overlay.component.vue';
import AdvisorDialogPanel from './advisor-dialog-panel.component.vue';

export default {
	title: 'Components / Advisor Dialog',
	subcomponents: {
		AdvisorDialogContianer,
		AdvisorDialogOverlay,
		AdvisorDialogPanel,
	},
	parameters: { layout: 'none' },
	args: {},
} satisfies Meta;

const html = String.raw;

export const AdvisorDialog: StoryFn = () => {
	return defineComponent({
		components: {
			AdvisorDialogContianer,
			AdvisorDialogOverlay,
			AdvisorDialogPanel,
		},
		setup() {
			const isOpen = ref(true);
			return { isOpen };
		},
		template: html`
			<div>
				<button class="bg-red-100 p-3 text-white-100" @click="isOpen = true">
					Open Dialog
				</button>
				<AdvisorDialogContianer v-model="isOpen">
					<AdvisorDialogOverlay />
					<AdvisorDialogPanel class="p-8">
						<p class="mb-3">Advisor Dailog Example</p>
						<button
							class="bg-red-100 p-3 text-white-100"
							@click="isOpen = false"
						>
							Close Dialog
						</button>
					</AdvisorDialogPanel>
				</AdvisorDialogContianer>
			</div>
		`,
	});
};
