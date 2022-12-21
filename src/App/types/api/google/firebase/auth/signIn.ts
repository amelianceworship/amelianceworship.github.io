import { TokenResponse, User } from './commonAuth';

export interface SignIn {
	email: string;
	password: string;
}

export interface SignInResponse {
	user: User;
	providerId?: unknown;
	_tokenResponse: TokenResponse;
	operationType: string;
}
