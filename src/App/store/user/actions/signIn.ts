import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { SignIn } from '~types/api/google/firebase/auth/signIn';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = SignIn;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const signIn = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/signIn',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await api.google.firebase.auth.signInWithEmail({ email, password });

			const userBeforeDatabase = await api.google.firebase.database.users
				.getUserById({ userId: response.user.uid });

			const dataToUserUpdate: Omit<User, 'lastVisitDate' | 'isOnline'> = { // TODO: check for non changes
				uid: response.user.uid,
				displayName: userBeforeDatabase.user.displayName || '',
				photoURL: userBeforeDatabase.user.photoURL || '',
				email: userBeforeDatabase.user.email || '',
				userType: userBeforeDatabase.user.userType || '',
				sex: userBeforeDatabase.user.sex || '',
				role: userBeforeDatabase.user.role || '',
				lastActiveChatId: userBeforeDatabase.user.lastActiveChatId || '',
				registrationDate: userBeforeDatabase.user.registrationDate || '',
				visitsCount: userBeforeDatabase.user.visitsCount || 0,
			};

			// *----- update user info in database -----
			await api.google.firebase.database.users.updateUser(dataToUserUpdate);

			// *----- get current auth user data -----
			const userFinalDatabase = await api.google.firebase.database.users
				.getUserById({ userId: response.user.uid });

			// *----- get current auth user data -----
			const currentAuthUser = api.google.firebase.auth.getCurrentAuthUser();

			return {
				uid: currentAuthUser.user.uid,
				displayName: userFinalDatabase.user.displayName,
				photoURL: userFinalDatabase.user.photoURL,
				email: userFinalDatabase.user.email,
				userType: userFinalDatabase.user.userType,
				sex: userFinalDatabase.user.sex,
				role: userFinalDatabase.user.role,
				lastActiveChatId: userFinalDatabase.user.lastActiveChatId,
				lastVisitDate: userFinalDatabase.user.lastVisitDate,
				registrationDate: userFinalDatabase.user.registrationDate,
				isOnline: userFinalDatabase.user.isOnline,
				visitsCount: userFinalDatabase.user.visitsCount,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
