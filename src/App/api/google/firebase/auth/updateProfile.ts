import type { User } from 'firebase/auth';
import { updateProfile as updateUserProfile } from 'firebase/auth';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { returnSuccess } from '../helpers/returnSuccess';

interface UpdateProfile {
	user: User;
	displayName: string;
	photoURL: string;

}

export async function updateProfile({
	user, displayName, photoURL,
}: UpdateProfile): Promise<SuccessResponse> {
	try {
		await updateUserProfile(user, {
			displayName,
			photoURL,
		});
		return returnSuccess();
	} catch (error) {
		throw new Error(returnError(error));
	}
}
