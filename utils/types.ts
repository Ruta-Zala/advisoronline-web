import { Maybe } from '~/types/graphql';

export type DeepPartialMaybe<T> = Maybe<
	T extends object
		? {
				[P in keyof T]?: DeepPartialMaybe<T[P]>;
		  }
		: T
>;

/**
 * Like `Required` but also excludes null
 */
export type RequiredNonNullable<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

type StrapiData<T> = {
	data: T;
	error: never;
};

type StrapiError = {
	data: never;
	error: {
		details: { errors: Array<{ message: string }> };
		message: string;
	};
};

export type StrapiResponse<T = unknown> = StrapiData<T> | StrapiError;

// Adjust other fields types when are needed
export type User = {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: false;
	blocked: false;
	createdAt: string;
	updatedAt: string;
	firstName: string;
	lastName: string;
	company: string;
	birthDate: unknown;
	hideBirthdayYear: false;
	firstLogin: unknown;
	gender: string;
	type: string;
	personalCode: unknown;
	personalAccessCode: unknown;
	bankHasChanged: unknown;
	bio: string;
	blogUrl: unknown;
	mobile: string;
	assetSize: unknown;
	anonSignature: unknown;
	forcePasswordReset: unknown;
	personalInterests: string;
	registrationNumber: unknown;
	mandate: unknown;
	notifyCommentsAfterMine: unknown;
	notifyCommentsByFav: unknown;
	notifyCommentsToMine: unknown;
	notifyContentsByFav: unknown;
	onFacebook: unknown;
	onLinkedin: unknown;
	onTwitter: unknown;
	personalEmail: string;
	position: unknown;
	promoterSince: string;
	workProvince: string;
	employmentRelationship: unknown;
	newsletterEnabled: boolean;
	companyNetworkHasChanged: unknown;
	companyNetworkCustom: unknown;
	shadowCompany: unknown;
	managerType: string;
	usePersonalEmail: unknown;
	companyNetworkChangeRequested: unknown;
	companyNetworkChangeApproved: unknown;
	signatureSet: unknown;
};
