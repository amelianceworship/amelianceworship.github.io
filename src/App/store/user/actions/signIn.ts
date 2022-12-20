import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { rejectErrorMessage } from '~store/helpers/rejectErrorMessage';
import { SignIn } from '~types/api/google/firebase/auth/signIn';

export const signIn = createAsyncThunk(
	'user/signIn',
	async ({ email, password }: SignIn, thunkAPI) => {
		try {
			return await api.google.firebase.signIn({ email, password });
		} catch (error) {
			return thunkAPI.rejectWithValue(rejectErrorMessage);
		}
	},
);
