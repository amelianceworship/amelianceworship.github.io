import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { rejectErrorMessage } from '~store/helpers/rejectErrorMessage';

export const signInWithGoogle = createAsyncThunk(
	'user/signInWithGoogle',
	async (_, thunkAPI) => {
		try {
			return await api.google.firebase.signInWithGoogle();
		} catch (error) {
			return thunkAPI.rejectWithValue(rejectErrorMessage);
		}
	},
);
