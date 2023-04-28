import { createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '~api/google/firebase/firebase';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';

type CreateAsyncThunkReturned = string | null;
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const getAuthUserId = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/getAuthUserId',
	async (_, thunkAPI) => {
		try {
			let authUserId = null;

			await new Promise((resolve) => {
				onAuthStateChanged(auth, async (user) => {
					authUserId = user?.uid;
					resolve(null);
				});
			});

			return authUserId;
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
