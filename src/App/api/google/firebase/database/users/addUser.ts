import { doc, setDoc } from 'firebase/firestore';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';
import { returnSuccess } from '../../helpers/returnSuccess';

export interface AddUser {
	uid: string;
}

const filePath = 'src/App/api/google/firebase/database/users/addUser.ts';

export async function addUser({ uid }: AddUser): Promise<SuccessResponse | ErrorResponse> {
	const usersRef = doc(db, 'users', uid);
	try {
		await setDoc(usersRef, { uid });
		return returnSuccess();
	} catch (error) {
		return returnError(filePath, error);
	}
}
