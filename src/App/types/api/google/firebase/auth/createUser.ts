import { User } from './commonAuth';

export interface CreateUser {
	email: string;
	password: string;
}

export type CreateUserResponse = User;
