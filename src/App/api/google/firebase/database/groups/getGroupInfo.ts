import { doc, getDoc } from 'firebase/firestore';

import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { GroupInfo } from '~types/api/google/firebase/database/groups/GroupInfo';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';

export type GetGroupInfo = ChatId;

export interface GetGroupInfoResponse extends SuccessResponse {
	info: GroupInfo;
}

const filePath = 'src/App/api/google/firebase/database/groups/getGroupInfo.ts';

export async function getGroupInfo(
	{ chatId }: GetGroupInfo,
): Promise<GetGroupInfoResponse | ErrorResponse> {
	const groupRef = doc(db, 'groups', chatId);
	try {
		const docSnap = await getDoc(groupRef);

		if (docSnap.exists()) {
			return { info: docSnap.data().info, status: 'success' };
		}

		return returnError(filePath, 'Can\'t find group info!');
	} catch (error) {
		return returnError(filePath, error);
	}
}
