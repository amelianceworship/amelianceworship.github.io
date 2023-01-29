import { doc, Timestamp, updateDoc } from 'firebase/firestore';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { Message } from '~types/api/google/firebase/commons/Message';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';
import { returnSuccess } from '../../helpers/returnSuccess';
import { getGroupMessages } from './getGroupMessages';

export type AddMessage = Omit<Message, 'messageId' | 'date' >;

const filePath = 'src/App/api/google/firebase/database/groups/addMessage.ts';

export async function addMessage({
	text, chatId, user,
}: AddMessage): Promise<SuccessResponse | ErrorResponse> {
	try {
		const response = await getGroupMessages({ chatId });

		if ('error' in response) return returnError(filePath, response.error?.toString());

		const newMessageId = response.messages && response.messages.length > 0
			? response.messages[response.messages.length - 1].messageId + 1 : 0;

		const message = {
			messageId: newMessageId,
			text,
			chatId,
			date: Timestamp.now().toMillis().toString(), // TODO: fix to ms
			user,
		};

		let messages;
		if ('messages' in response && response.messages && response.messages.length > 0) {
			messages = [...response.messages, message];
		} else {
			messages = [message];
		}

		const docRef = doc(db, 'groups', chatId);
		await updateDoc(docRef, { messages });
		return returnSuccess();
	} catch (error) {
		return returnError(filePath, error);
	}
}
