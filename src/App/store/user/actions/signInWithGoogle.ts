import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const signInWithGoogle = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/signInWithGoogle',
	async (_, thunkAPI) => {
		try {
			await api.google.firebase.auth.signInWithGoogle();

			// *----- get current logged user data -----
			const userAuthResponse = api.google.firebase.auth.getCurrentAuthUser();

			let userResponse = null;

			try {
				userResponse = await api.google.firebase.database.users
					.getUserById({ userId: userAuthResponse.user.uid });
			} catch (e) { /**/ }

			if (!userResponse) {
				// *----- add user to database -----
				const addUserResponse = await api.google.firebase.database.users
					.addUser({ uid: userAuthResponse.user.uid });

				// *----- update user info in database -----
				if (!('error' in addUserResponse)) {
					await api.google.firebase.database.users.updateUser({
						uid: userAuthResponse.user.uid,
						displayName: userAuthResponse.user.displayName || 'User',
						photoURL: userAuthResponse.user.photoURL || '',
						email: userAuthResponse.user.email || '',
						userType: 'user',
						role: '',
						sex: '',
						lastActiveChatId: '0',
						registrationDate: '',
						visitsCount: 1,
					});
				}
				// *----- add chatList for user -----
				await api.google.firebase.database.userChats
					.addUserChatsForUser({ uid: userAuthResponse.user.uid });

				// *----- get current auth user data -----
				userResponse = await api.google.firebase.database.users
					.getUserById({ userId: userAuthResponse.user.uid });
			} else {
				const dataToUserUpdate: Omit<User, 'lastVisitDate' | 'isOnline'> = { // TODO: check for non changes
					uid: userResponse.user.uid,
					displayName: userResponse.user.displayName || '',
					photoURL: userResponse.user.photoURL || '',
					email: userResponse.user.email || '',
					userType: userResponse.user.userType || '',
					sex: userResponse.user.sex || '',
					role: userResponse.user.role || '',
					lastActiveChatId: userResponse.user.lastActiveChatId || '',
					registrationDate: userResponse.user.registrationDate || '',
					visitsCount: (userResponse.user.visitsCount || 0) + 1,
				};

				// *----- update user info in database -----
				await api.google.firebase.database.users.updateUser(dataToUserUpdate);
			}

			// *----- get current auth user data -----
			const userFinalDatabase = await api.google.firebase.database.users
				.getUserById({ userId: userAuthResponse.user.uid });

			// *----- get current auth user data -----
			const currentAuthUser = api.google.firebase.auth.getCurrentAuthUser();

			return {
				uid: currentAuthUser.user.uid,
				displayName: userFinalDatabase.user.displayName,
				photoURL: userFinalDatabase.user.photoURL,
				email: userFinalDatabase.user.email,
				userType: userFinalDatabase.user.userType,
				sex: userFinalDatabase.user.sex,
				role: userFinalDatabase.user.role,
				lastActiveChatId: userFinalDatabase.user.lastActiveChatId,
				lastVisitDate: userFinalDatabase.user.lastVisitDate,
				registrationDate: userFinalDatabase.user.registrationDate,
				isOnline: userFinalDatabase.user.isOnline,
				visitsCount: userFinalDatabase.user.visitsCount,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
