import { createAsyncThunk } from '@reduxjs/toolkit';

import { returnError } from '~api/helpers/returnError';
import { api } from '~api/index';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = Pick<User, 'uid' | 'displayName' | 'photoURL' | 'email' >;
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const signInWithGoogle = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/signInWithGoogle',
	async (_, thunkAPI) => {
		try {
			await api.google.firebase.auth.signInWithGoogle();

			// *----- get current logged user data -----
			const userResponse = api.google.firebase.auth.getCurrentAuthUser();

			return {
				displayName: userResponse.user.displayName || '',
				email: userResponse.user.email || '',
				photoURL: userResponse.user.photoURL || '',
				uid: userResponse.user.uid || '',
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
