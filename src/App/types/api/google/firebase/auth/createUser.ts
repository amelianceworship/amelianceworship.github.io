import type { User } from './commonAuth';

export interface CreateUser {
	displayName: string;
	email: string;
	password: string;
	photo: File;
}

export type CreateUserResponse = User;
