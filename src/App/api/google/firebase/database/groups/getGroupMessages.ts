import {	doc, getDoc } from 'firebase/firestore';

import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { Messages } from '~types/api/google/firebase/commons/Messages';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';

export type GetGroupMessages = ChatId;

export type GetGroupMessagesResponse = Messages & SuccessResponse;

const filePath = 'src/App/api/google/firebase/database/groups/getGroupMessages.ts';

export async function getGroupMessages(
	{ chatId }: GetGroupMessages,
): Promise<GetGroupMessagesResponse | ErrorResponse> {
	const chatRef = doc(db, 'groups', chatId);
	try {
		const docSnap = await getDoc(chatRef);
		if (docSnap.exists()) return { messages: docSnap.data().messages, status: 'success' };

		return returnError(filePath, 'Can\'t find group messages!');
	} catch (error) {
		return returnError(filePath, error);
	}
}
