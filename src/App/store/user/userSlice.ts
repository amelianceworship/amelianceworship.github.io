import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { api } from '~api/index';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

import { createUserWithEmail } from './actions/createUserWithEmail';
import { getAuthUserById } from './actions/getAuthUserById';
import { getAuthUserId } from './actions/getAuthUserId';
import { initUserOnPageLoad } from './actions/initUserOnPageLoad';
import { signIn } from './actions/signIn';
import { signInWithGoogle } from './actions/signInWithGoogle';
import { updateUser } from './actions/updateUser';

interface UserState {
	isLoading: boolean;
	error: ErrorString;
	user: User;
	fetchedUserData: User | null;
	authUserId: undefined | string | null;
}

const initialState: UserState = {
	isLoading: false,
	error: '',
	user: {} as User,
	fetchedUserData: null,
	authUserId: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user.uid = action.payload.uid;
			state.user.displayName = action.payload.displayName;
			state.user.photoURL = action.payload.photoURL;
			state.user.email = action.payload.email;
		},
		setUserDataFromFetched(state) {
			state.user = state.fetchedUserData || {} as User;
			state.fetchedUserData = null;
		},
		signOut(state) {
			state.user = {} as User;
			state.error = '';
			state.isLoading = false;
			api.google.firebase.auth.signOut();
		},
		resetError(state) {
			state.error = '';
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(createUserWithEmail.pending, (state) => {
				state.fetchedUserData = {} as User;
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				createUserWithEmail.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.fetchedUserData = action.payload;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(createUserWithEmail.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(signIn.pending, (state) => {
				state.fetchedUserData = null;
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				signIn.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.fetchedUserData = action.payload;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(signIn.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(signInWithGoogle.pending, (state) => {
				state.fetchedUserData = null;
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				signInWithGoogle.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.fetchedUserData = action.payload;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(signInWithGoogle.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(updateUser.pending, (state) => {
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				updateUser.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(updateUser.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(initUserOnPageLoad.pending, (state) => {
				state.user = {} as User;
				state.error = '';
				state.isLoading = true;
			})
			.addCase(initUserOnPageLoad.fulfilled, (state, action: PayloadAction<User>) => {
				state.user = action.payload;
				state.error = '';
				state.isLoading = false;
			})
			.addCase(initUserOnPageLoad.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(getAuthUserId.pending, (state) => {
				state.error = '';
				state.isLoading = true;
				state.authUserId = undefined;
			})
			.addCase(
				getAuthUserId.fulfilled,
				(state, action: PayloadAction<UserState['authUserId']>) => {
					state.authUserId = action.payload || null;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(getAuthUserId.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(getAuthUserById.pending, (state) => {
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				getAuthUserById.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(getAuthUserById.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			});
	},
});
