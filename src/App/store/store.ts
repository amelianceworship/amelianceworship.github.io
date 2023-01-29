import { configureStore } from '@reduxjs/toolkit';

import { appSlice } from './app/appSlice';
import { songsListSlice } from './songsList/songsListSlice';
import { userSlice } from './user/userSlice';

export const store = configureStore({
	reducer: {
		songsListReducer: songsListSlice.reducer,
		userReducer: userSlice.reducer,
		appReducer: appSlice.reducer,
	},
});
