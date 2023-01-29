import type { User } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';
import { returnError } from '../helpers/returnError';

export interface CreateUser {
	email: string;
	password: string;
}

export interface CreateUserResponse extends SuccessResponse {
	user: User;
}

const filePath = 'src/App/api/google/firebase/auth/createUser.ts';

export async function createUser({
	email, password,
}: CreateUser): Promise<CreateUserResponse | ErrorResponse> {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return { user: userCredential.user, status: 'success' };
	} catch (error) {
		return returnError(filePath, error);
	}
}
