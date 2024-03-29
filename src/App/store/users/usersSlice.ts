import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { UserResponse } from '~types/api/google/firebase/commons/UserResponse';

import { getAllUsers } from './actions/getAllUsers';

interface UsersState {
	isLoading: boolean;
	error: ErrorString;
	users: UserResponse[];
	usersRealtime: UserResponse[];
}

const initialState: UsersState = {
	isLoading: false,
	error: '',
	users: [],
	usersRealtime: [],
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		removeUsers(state) {
			state.users = [];
		},
		resetError(state) {
			state.error = '';
		},
		setUsersRealtime(state, action: PayloadAction<UsersState['usersRealtime']>) {
			state.usersRealtime = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(getAllUsers.pending, (state) => {
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				getAllUsers.fulfilled,
				(state, action: PayloadAction<UsersState['users']>) => {
					state.users = action.payload;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(getAllUsers.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			});
	},
});
