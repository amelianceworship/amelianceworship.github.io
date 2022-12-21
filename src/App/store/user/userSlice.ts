import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateUserResponse } from '~types/api/google/firebase/auth/createUser';
import { SignInResponse } from '~types/api/google/firebase/auth/signIn';
import { ErrorResponse } from '~types/api/google/firebase/ErrorResponse';

import { createUser } from './actions/createUser';
import { signIn } from './actions/signIn';

interface UserState {
	isLoading: boolean;
	error: string;
	email: string;
	token: string;
	id: string;
}

const initialState: UserState = {
	isLoading: false,
	error: '',
	email: '',
	token: '',
	id: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.id = action.payload.id;
		},
		removeUser(state) {
			state.email = '';
			state.token = '';
			state.id = '';
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				state.email = '';
				state.token = '';
				state.id = '';
			})
			.addCase(
				createUser.fulfilled,
				(state, action: PayloadAction<CreateUserResponse | ErrorResponse | unknown>) => {
					if ((action.payload as ErrorResponse)?.errorMessage) {
						state.error = (action.payload as ErrorResponse).errorMessage;
					} else {
						state.email = (action.payload as CreateUserResponse)?.user.email;
						state.id = (action.payload as CreateUserResponse)?.user.uid;
						// eslint-disable-next-line no-underscore-dangle
						state.token = (action.payload as CreateUserResponse)?._tokenResponse.idToken;
					}
					state.isLoading = false;
				},
			)
			.addCase(createUser.rejected, (state, action: PayloadAction<unknown>) => {
				(state.error as unknown) = action.payload;
				state.isLoading = false;
			})

			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				state.email = '';
				state.token = '';
				state.id = '';
			})
			.addCase(
				signIn.fulfilled,
				(state, action: PayloadAction<SignInResponse | ErrorResponse | unknown>) => {
					if ((action.payload as ErrorResponse)?.errorMessage) {
						state.error = (action.payload as ErrorResponse).errorMessage;
					} else {
						state.email = (action.payload as SignInResponse)?.user.email;
						state.id = (action.payload as SignInResponse)?.user.uid;
						// eslint-disable-next-line no-underscore-dangle
						state.token = (action.payload as SignInResponse)?._tokenResponse.idToken;
					}
					state.isLoading = false;
				},
			)
			.addCase(signIn.rejected, (state, action: PayloadAction<unknown>) => {
				(state.error as unknown) = action.payload;
				state.isLoading = false;
			});
	},
});
