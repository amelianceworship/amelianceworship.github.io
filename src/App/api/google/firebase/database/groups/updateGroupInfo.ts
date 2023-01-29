import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { GroupInfo } from '~types/api/google/firebase/database/groups/GroupInfo';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';
import { returnSuccess } from '../../helpers/returnSuccess';

export interface UpdateGroupInfo extends Partial<Omit<GroupInfo, 'date'>> {
	chatId: string;
}

const filePath = 'src/App/api/google/firebase/database/groups/updateGroupInfo.ts';

export async function updateGroupInfo({
	chatId, displayName, photoURL, lastText, color, ownerId, admins, type,
}: UpdateGroupInfo): Promise<SuccessResponse | ErrorResponse> {
	const groupRef = doc(db, 'groups', chatId);
	try {
		const info = {} as GroupInfo;
		if (chatId) info.chatId = chatId;
		if (displayName) info.displayName = displayName;
		if (photoURL) info.photoURL = photoURL;
		info.date = serverTimestamp().toString(); // TODO: Fix to milliseconds
		if (lastText) info.lastText = lastText;
		if (color) info.color = color;
		if (ownerId) info.ownerId = ownerId;
		if (admins && admins.length > 0) info.admins = admins;
		if (type) info.type = type;
		await updateDoc(groupRef, { info });
		return returnSuccess();
	} catch (error) {
		return returnError(filePath, error);
	}
}
