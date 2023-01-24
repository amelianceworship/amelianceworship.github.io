import { doc, getDoc } from 'firebase/firestore';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { User } from '~types/api/google/firebase/commons/User';

import { db } from '../../firebase';
import { returnError } from '../../helpers/returnError';

interface GetUserById {
	userId: string;
}

export interface GetUserByIdResponse extends SuccessResponse {
	user: User;
}

const filePath = 'src/App/api/google/firebase/database/users/getUserById.ts';

export async function getUserById(
	{ userId }: GetUserById,
): Promise<GetUserByIdResponse | ErrorResponse> {
	const userRef = doc(db, 'users', userId);

	try {
		const docSnap = await getDoc(userRef);

		if (docSnap.exists()) {
			const { user } = docSnap.data();
			return { user, status: 'success' };
		}

		return returnError(filePath, 'Can\'t find user!');
	} catch (error) {
		return returnError(filePath, error);
	}
}
