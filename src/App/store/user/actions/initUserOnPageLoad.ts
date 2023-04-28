import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

interface UpdateUser extends Partial<Omit<User, 'photoURL' | 'uid' | 'lastVisitDate' | 'registrationDate'>> {
	uid: string;
	photo?: File;
}

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = UpdateUser;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const initUserOnPageLoad = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/initUserOnPageLoad',
	async ({ uid }, thunkAPI) => {
		try {
			const userBeforeDatabase = await api.google.firebase.database.users
				.getUserById({ userId: uid });

			const dataToUserUpdate: Omit<User, 'lastVisitDate' | 'isOnline'> = {
				uid,
				displayName: userBeforeDatabase.user?.displayName || '',
				photoURL: userBeforeDatabase.user?.photoURL || '',
				email: userBeforeDatabase.user?.email || '',
				userType: userBeforeDatabase.user?.userType || '',
				sex: userBeforeDatabase.user?.sex || '',
				role: userBeforeDatabase.user?.role || '',
				lastActiveChatId: userBeforeDatabase.user?.lastActiveChatId || '',
				registrationDate: userBeforeDatabase.user?.registrationDate || '',
				visitsCount: (userBeforeDatabase.user?.visitsCount || 0) + 1,
			};

			// *----- update user info in database -----
			await api.google.firebase.database.users.updateUser(dataToUserUpdate);

			const userFinalResponse = await api.google.firebase.database.users
				.getUserById({ userId: uid });

			return {
				uid: userFinalResponse.user.uid,
				displayName: userFinalResponse.user.displayName,
				photoURL: userFinalResponse.user.photoURL,
				email: userFinalResponse.user.email,
				userType: userFinalResponse.user.userType,
				sex: userFinalResponse.user.sex,
				role: userFinalResponse.user.role,
				lastActiveChatId: userFinalResponse.user.lastActiveChatId,
				lastVisitDate: userFinalResponse.user.lastVisitDate,
				registrationDate: userFinalResponse.user.registrationDate,
				isOnline: userFinalResponse.user.isOnline,
				visitsCount: userFinalResponse.user.visitsCount,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
