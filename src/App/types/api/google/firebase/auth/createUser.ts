import { TokenResponse, User } from './commonAuth';

export interface CreateUser {
	email: string;
	password: string;
}

export interface CreateUserResponse {
	user: User;
	providerId?: unknown;
	_tokenResponse: TokenResponse;
	operationType: string;
}
