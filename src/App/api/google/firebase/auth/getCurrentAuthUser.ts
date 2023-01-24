import type { User } from 'firebase/auth';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';
import { returnError } from '../helpers/returnError';

interface GetCurrentAuthUserResponse extends SuccessResponse {
	user: User;
}

const filePath = 'src/App/api/google/firebase/auth/getCurrentAuthUser.ts';

export function getCurrentAuthUser(): GetCurrentAuthUserResponse | ErrorResponse {
	const user = auth.currentUser;
	if (user !== null) return { user, status: 'success' };

	return returnError(filePath, 'Can\'t find user auth!');
}
