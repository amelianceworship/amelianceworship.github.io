import asm from 'asm-ts-scripts';
import type { DocumentData } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';

type Users = Record<string, DocumentData>;

export interface GetAllUsersResponse extends SuccessResponse {
	users: Users;
}

const filePath = 'src/App/api/google/firebase/database/users/getAllUsers.ts';

export async function getAllUsers(): Promise<GetAllUsersResponse | ErrorResponse> {
	const usersRef = collection(db, 'users');

	try {
		const docSnap = await getDocs(usersRef);
		const users: Users = {};
		docSnap.forEach((doc) => {
			users[doc.id] = doc.data();
		});
		if (!asm.isObjectEmpty(users)) return { users, status: 'success' };

		const error = 'Can\'t find any chats!';
		return returnError(filePath, error);
	} catch (error) {
		return returnError(filePath, error);
	}
}
