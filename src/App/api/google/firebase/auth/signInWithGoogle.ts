import type { User } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth, googleAuthProvider } from '../firebase';
import { returnError } from '../helpers/returnError';

interface SignInWithGoogle extends SuccessResponse {
	user: User;
}

const filePath = 'src/App/api/google/firebase/auth/signInWithGoogle.ts';

export async function signInWithGoogle(): Promise<SignInWithGoogle | ErrorResponse> {
	try {
		const response = await signInWithPopup(auth, googleAuthProvider);
		return { user: response.user, status: 'success' };
	} catch (error) {
		return returnError(filePath, error);
	}
}
