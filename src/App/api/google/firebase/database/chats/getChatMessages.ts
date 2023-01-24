import { doc, getDoc, setDoc } from 'firebase/firestore';

import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { Messages } from '~types/api/google/firebase/commons/Messages';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';

type GetChatMessages = ChatId;

export interface GetChatMessagesResponse extends SuccessResponse, Messages {}

const filePath = 'src/App/api/google/firebase/database/chats/getChatMessages.ts';

export async function getChatMessages(
	{ chatId }: GetChatMessages,
): Promise<GetChatMessagesResponse | ErrorResponse> {
	const chatRef = doc(db, 'chats', chatId);
	try {
		const docSnap = await getDoc(chatRef);
		if (docSnap.exists()) return { messages: docSnap.data().message, status: 'success' };

		await setDoc(chatRef, { messages: [] });

		const docSnapNew = await getDoc(chatRef);
		if (docSnapNew.exists()) return { messages: docSnapNew.data().message, status: 'success' };

		return returnError(filePath, 'Can\'t find group chat!');
	} catch (error) {
		return returnError(filePath, error);
	}
}

// export async function getChatMessages(
// 	{ chatId }: GetChatMessages,
// ): Promise<GetChatMessagesResponse | ErrorResponse> {
// 	const docRef = doc(db, 'chats', chatId);
// 	return getDoc(docRef)
// 		.then(async (docSnap) => {
// 			if (docSnap.exists()) return { messages: docSnap.data().messages };
// 			setDoc(docRef, { messages: [] });
// 			return getDoc(docRef)
// 				.then((docSnapNew) => ({ messages: docSnapNew.data()?.messages })).catch((error) => {
// 					appError('getChatMessages', { error });
// 					return { error };
// 				});
// 		})
// 		.catch((error) => {
// 			appError('getChatMessages', { error });
// 			return { error };
// 		});
// }
