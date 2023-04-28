import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = Pick<User, 'uid'>;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const getAuthUserById = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/getAuthUserById',
	async ({ uid }, thunkAPI) => {
		try {
			const userResponse = await api.google.firebase.database.users
				.getUserById({ userId: uid });

			return {
				uid: userResponse.user.uid,
				displayName: userResponse.user.displayName,
				photoURL: userResponse.user.photoURL,
				email: userResponse.user.email,
				userType: userResponse.user.userType,
				sex: userResponse.user.sex,
				role: userResponse.user.role,
				lastActiveChatId: userResponse.user.lastActiveChatId,
				lastVisitDate: userResponse.user.lastVisitDate,
				registrationDate: userResponse.user.registrationDate,
				isOnline: userResponse.user.isOnline,
				visitsCount: userResponse.user.visitsCount,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
