import { signOut as signOutUser } from 'firebase/auth';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';
import { returnError } from '../helpers/returnError';
import { returnSuccess } from '../helpers/returnSuccess';

const filePath = 'src/App/api/google/firebase/auth/signOut.ts';

export function signOut(): SuccessResponse | ErrorResponse {
	try {
		signOutUser(auth);
		return returnSuccess();
	} catch (error) {
		return returnError(filePath, error);
	}
}
