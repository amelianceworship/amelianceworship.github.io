import type { User } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';
import { returnError } from '../helpers/returnError';

interface SignIn {
	email: string;
	password: string;
}

interface SignInResponse extends SuccessResponse {
	user: User;
}

const filePath = 'src/App/api/google/firebase/auth/signIn.ts';

export async function signIn({ email, password }: SignIn): Promise<SignInResponse | ErrorResponse> {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return { user: userCredential.user, status: 'success' };
	} catch (error) {
		return returnError(filePath, error);
	}
}
