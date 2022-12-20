export interface ProviderData {
	displayName?: unknown;
	email: string;
	phoneNumber?: unknown;
	photoURL?: unknown;
	providerId: string;
	uid: string;
}

export interface StsTokenManager {
	accessToken: string;
	expirationTime: number;
	refreshToken: string;
}

export interface User {
	apiKey: string;
	appName: string;
	createdAt: string;
	email: string;
	emailVerified: boolean;
	isAnonymous: boolean;
	lastLoginAt: string;
	providerData: ProviderData[];
	stsTokenManager: StsTokenManager;
	uid: string;
}

export interface TokenResponse {
	email: string;
	expiresIn: string;
	idToken: string;
	kind: string;
	localId: string;
	refreshToken: string;
}
