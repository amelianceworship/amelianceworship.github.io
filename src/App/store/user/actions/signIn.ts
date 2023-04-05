import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { SignIn } from '~types/api/google/firebase/auth/signIn';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = Pick<User, 'uid' | 'displayName' | 'photoURL' | 'email' >;
type CreateAsyncThunkArguments = SignIn;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const signIn = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/signIn',
	async ({ email, password }: SignIn, thunkAPI) => {
		try {
			const response = await api.google.firebase.auth.signIn({ email, password });

			return {
				uid: response.user.uid || '',
				displayName: response.user.displayName || '',
				photoURL: response.user.photoURL || '',
				email: response.user.email || '',
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
