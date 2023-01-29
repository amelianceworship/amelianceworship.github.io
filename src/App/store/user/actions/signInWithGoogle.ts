import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { rejectError } from '~store/helpers/rejectError';
import { returnActionError } from '~store/helpers/returnActionError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = Pick<User, 'uid' | 'displayName' | 'photoURL' | 'email' > | ErrorString;
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const signInWithGoogle = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/signInWithGoogle',
	async (_, thunkAPI) => {
		try {
			const response = await api.google.firebase.auth.signInWithGoogle();
			if ('error' in response) return returnActionError(response);

			// *----- get current logged user data -----
			const userResponse = api.google.firebase.auth.getCurrentAuthUser();
			if ('error' in userResponse) return returnActionError(userResponse);

			return {
				displayName: userResponse.user.displayName || '',
				email: userResponse.user.email || '',
				photoURL: userResponse.user.photoURL || '',
				uid: userResponse.user.uid || '',
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(rejectError);
		}
	},
);
