import asm from 'asm-ts-scripts';
import { collection, getDocs } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { UsersResponse } from '~types/api/google/firebase/commons/UsersResponse';

import { db } from '../../firebase';

export interface GetAllUsersResponse extends SuccessResponse {
	users: UsersResponse;
}

export async function getAllUsers(): Promise<GetAllUsersResponse> {
	const usersRef = collection(db, 'users');

	try {
		const docSnap = await getDocs(usersRef);
		const users: UsersResponse = {};
		docSnap.forEach((doc) => {
			const data = doc.data();
			users[doc.id] = { uid: data.uid, ...data.user };
		});
		if (!asm.isObjectEmpty(users)) return { users, status: 'success' };

		throw new Error(returnError('Can\'t find any users!'));
	} catch (error) {
		throw new Error(returnError(error));
	}
}
