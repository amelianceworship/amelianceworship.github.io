import { addDoc, collection } from 'firebase/firestore';

import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';

export type AddGroupResponse = ChatId & SuccessResponse;

const filePath = 'src/App/api/google/firebase/database/groups/addGroup.ts';

export async function addGroup(): Promise<AddGroupResponse | ErrorResponse> {
	const groupsRef = collection(db, 'groups');

	try {
		const docRef = await addDoc(groupsRef, {});
		return { chatId: docRef.id, status: 'success' };
	} catch (error) {
		return returnError(filePath, error);
	}
}
