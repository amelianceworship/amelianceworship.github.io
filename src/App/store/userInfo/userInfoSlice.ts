import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { UserResponse } from '~types/api/google/firebase/commons/UserResponse';

import { getUserInfo } from './actions/getUserInfo';

interface UserInfoState {
	isLoading: boolean;
	error: ErrorString;
	userInfo: UserResponse;
	userInfoRealtime: UserResponse;
}

const initialState: UserInfoState = {
	isLoading: false,
	error: '',
	userInfo: {} as UserInfoState['userInfo'],
	userInfoRealtime: {} as UserInfoState['userInfoRealtime'],
};

export const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		removeUserInfo(state) {
			state.userInfo = {} as UserInfoState['userInfo'];
		},
		resetError(state) {
			state.error = '';
		},
		setUsersRealtime(state, action: PayloadAction<UserInfoState['userInfoRealtime']>) {
			state.userInfoRealtime = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(getUserInfo.pending, (state) => {
				state.error = '';
				state.isLoading = true;
				state.userInfo = {} as UserInfoState['userInfo'];
			})
			.addCase(
				getUserInfo.fulfilled,
				(state, action: PayloadAction<UserInfoState['userInfo']>) => {
					state.userInfo = { ...action.payload };
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(getUserInfo.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			});
	},
});
