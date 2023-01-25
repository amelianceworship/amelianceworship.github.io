import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

import { createUser } from './actions/createUser';
import { signIn } from './actions/signIn';
import { signInWithGoogle } from './actions/signInWithGoogle';

interface UserState {
	isLoading: boolean;
	error: unknown;
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	status: 'user' | 'admin' | 'owner';
	sex: 'male' | 'female' | 'unknown';
	role: string;
	lastActiveChatId: string;
	lastVisitDate: string;
	isOnline: boolean;
}

const initialState: UserState = {
	isLoading: false,
	error: '',
	uid: '',
	displayName: '',
	photoURL: '',
	email: '',
	status: 'user',
	sex: 'unknown',
	role: '',
	lastActiveChatId: '',
	lastVisitDate: '',
	isOnline: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.uid = action.payload.uid;
			state.displayName = action.payload.displayName;
			state.photoURL = action.payload.photoURL;
			state.email = action.payload.email;
		},
		removeUser(state) {
			state.uid = '';
			state.displayName = '';
			state.photoURL = '';
			state.email = '';
			state.status = 'user';
			state.sex = 'unknown';
			state.role = '';
			state.lastActiveChatId = '';
			state.lastVisitDate = '';
			state.isOnline = false;
		},
		resetError(state) {
			state.error = '';
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				state.uid = '';
				state.displayName = '';
				state.photoURL = '';
				state.email = '';
				state.status = 'user';
				state.sex = 'unknown';
				state.role = '';
				state.lastActiveChatId = '';
				state.lastVisitDate = '';
				state.isOnline = false;
			})
			.addCase(
				createUser.fulfilled,
				(state, action: PayloadAction<Pick<User, 'uid' | 'displayName' | 'photoURL' | 'email' > | ErrorString>) => {
					if ('error' in action.payload) {
						state.error = action.payload.error;
					} else {
						state.uid = action.payload.uid;
						state.displayName = action.payload.displayName;
						state.photoURL = action.payload.photoURL;
						state.email = action.payload.email;
					}

					state.isLoading = false;
				},
			)
			.addCase(createUser.rejected, (state, action: PayloadAction<unknown>) => {
				state.error = (action.payload as ErrorString).error;
				state.isLoading = false;
			})

			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				state.uid = '';
				state.displayName = '';
				state.photoURL = '';
				state.email = '';
				state.status = 'user';
				state.sex = 'unknown';
				state.role = '';
				state.lastActiveChatId = '';
				state.lastVisitDate = '';
				state.isOnline = false;
			})
			.addCase(
				signIn.fulfilled,
				(state, action: PayloadAction<Pick<User, 'email' | 'displayName' | 'photoURL' | 'uid' > | ErrorString>) => {
					if ('error' in action.payload) {
						state.error = action.payload.error;
					} else {
						state.email = action.payload.email;
						state.displayName = action.payload.displayName;
						state.photoURL = action.payload.photoURL;
						state.uid = action.payload.uid;
					}
					state.isLoading = false;
				},
			)
			.addCase(signIn.rejected, (state, action: PayloadAction<unknown>) => {
				state.error = (action.payload as ErrorString).error;
				state.isLoading = false;
			})

			.addCase(signInWithGoogle.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				state.uid = '';
				state.displayName = '';
				state.photoURL = '';
				state.email = '';
				state.status = 'user';
				state.sex = 'unknown';
				state.role = '';
				state.lastActiveChatId = '';
				state.lastVisitDate = '';
				state.isOnline = false;
			})
			.addCase(
				signInWithGoogle.fulfilled,
				(state, action: PayloadAction<Pick<User, 'email' | 'displayName' | 'photoURL' | 'uid' > | ErrorString>) => {
					if ('error' in action.payload) {
						state.error = action.payload.error;
					} else {
						state.email = action.payload.email;
						state.displayName = action.payload.displayName;
						state.photoURL = action.payload.photoURL;
						state.uid = action.payload.uid;
					}
					state.isLoading = false;
				},
			)
			.addCase(signInWithGoogle.rejected, (state, action: PayloadAction<unknown>) => {
				state.error = (action.payload as ErrorString).error;
				state.isLoading = false;
			});
	},
});
