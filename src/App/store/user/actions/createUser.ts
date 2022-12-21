import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { rejectErrorMessage } from '~store/helpers/rejectErrorMessage';
import { CreateUser } from '~types/api/google/firebase/auth/createUser';

export const createUser = createAsyncThunk(
	'user/createUser',
	async ({ email, password }: CreateUser, thunkAPI) => {
		try {
			return await api.google.firebase.createUser({ email, password });
		} catch (error) {
			return thunkAPI.rejectWithValue(rejectErrorMessage);
		}
	},
);
