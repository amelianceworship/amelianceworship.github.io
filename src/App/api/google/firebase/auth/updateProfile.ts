import type { User } from 'firebase/auth';
import { updateProfile as updateUserProfile } from 'firebase/auth';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { returnError } from '../helpers/returnError';
import { returnSuccess } from '../helpers/returnSuccess';

interface UpdateProfile {
	user: User;
	displayName: string;
	photoURL: string;

}

const filePath = 'src/App/api/google/firebase/auth/updateProfile.ts';

export async function updateProfile({
	user, displayName, photoURL,
}: UpdateProfile): Promise<SuccessResponse | ErrorResponse> {
	try {
		await updateUserProfile(user, {
			displayName,
			photoURL,
		});
		return returnSuccess();
	} catch (error) {
		return returnError(filePath, error);
	}
}
