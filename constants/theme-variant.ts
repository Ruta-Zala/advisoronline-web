export const themeVariants = ['dark', 'light'] as const;
export type ThemeVariant = (typeof themeVariants)[number];

export function themeVariantValidator(variant: unknown) {
	return themeVariants.includes(variant as ThemeVariant);
}

export const themeVariantArgType = {
	control: 'select',
	options: themeVariants,
};
