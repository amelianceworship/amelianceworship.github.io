import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { getCurrentDateInMs } from '~helpers/getCurrentDateInMs';
import { rejectError } from '~store/helpers/rejectError';
import { returnActionError } from '~store/helpers/returnActionError';
import type { CreateUser } from '~types/api/google/firebase/auth/createUser';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = Pick<User, 'uid' | 'displayName' | 'photoURL' | 'email' > | ErrorString;
type CreateAsyncThunkArguments = CreateUser;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const createUser = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/createUser',
	async ({
		displayName, email, password, photo,
	}: CreateUser, thunkAPI) => {
		try {
			//* ----- create user in auth -----
			const response = await api.google.firebase.auth.createUser({ email, password });
			if ('error' in response) return returnActionError(response);

			// *----- upload user image -----
			const responseURL = photo ? await api.google.firebase.storage.uploadFile({
				refName: `users/${response.user.uid}/profile/profileImage-${response.user.uid}-${getCurrentDateInMs()}`,
				file: photo,
			}) : null;
			const downloadURL = (responseURL && 'downloadURL' in responseURL) ? responseURL.downloadURL || '' : '';

			// *----- add user to database -----
			const addUserResponse = await api.google.firebase.database.users
				.addUser({ uid: response.user.uid });

			// *----- update user info in database -----
			if (!('error' in addUserResponse)) {
				await api.google.firebase.database.users.updateUser({
					uid: response.user.uid,
					displayName: response.user.displayName || 'User',
					photoURL: downloadURL,
					email: response.user.email || '',
					status: 'user',
					sex: 'unknown',
					lastActiveChatId: '0',
				});
			}

			// *----- update auth user data -----
			await api.google.firebase.auth.updateProfile({
				user: response.user,
				displayName,
				photoURL: downloadURL,
			});

			// *----- add chatList for user -----
			await api.google.firebase.database.userChats
				.addUserChatsForUser({ uid: response.user.uid });

			// *----- get current auth user data -----
			const userResponse = api.google.firebase.auth.getCurrentAuthUser();
			if ('error' in userResponse) return returnActionError(userResponse);

			return {
				uid: userResponse.user.uid?.toString() || '',
				displayName: userResponse.user.displayName?.toString() || '',
				photoURL: userResponse.user.photoURL?.toString() || '',
				email: userResponse.user.email?.toString() || '',
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(rejectError);
		}
	},
);
