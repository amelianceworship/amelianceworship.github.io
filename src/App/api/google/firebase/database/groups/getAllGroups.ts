import asm from 'asm-ts-scripts';
import type { DocumentData } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';

type Groups = Record<string, DocumentData>;

export interface GetAllGroupsResponse extends SuccessResponse {
	groups: Groups;
}

const filePath = 'src/App/api/google/firebase/database/groups/getAllGroups.ts';

export async function getAllGroups(): Promise<GetAllGroupsResponse | ErrorResponse> {
	const groupsRef = collection(db, 'groups');

	try {
		const docSnap = await getDocs(groupsRef);
		const groups: Groups = {};
		docSnap.forEach((doc) => {
			groups[doc.id] = doc.data();
		});
		if (!asm.isObjectEmpty(groups)) return { groups, status: 'success' };

		return returnError(filePath, 'Can\'t find any groups!');
	} catch (error) {
		return returnError(filePath, error);
	}
}
