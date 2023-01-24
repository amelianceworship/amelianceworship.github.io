import { doc, setDoc } from 'firebase/firestore';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';
import { returnSuccess } from '../../helpers/returnSuccess';

interface AddUserChatsForUser {
	uid: string;
}

const filePath = 'src/App/api/google/firebase/database/userChats/addUserChatsForUser.ts';

export async function addUserChatsForUser({
	uid,
}: AddUserChatsForUser): Promise<SuccessResponse | ErrorResponse> {
	const userChatsRef = doc(db, 'userChats', uid);

	try {
		await setDoc(userChatsRef, {});
		return returnSuccess();
	} catch (error) {
		return returnError(filePath, error);
	}
}
