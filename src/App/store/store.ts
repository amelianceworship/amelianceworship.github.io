import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { APP } from '~constants/APP';

import { appSlice } from './app/appSlice';
import { chatSlice } from './chat/chatSlice';
import { songsListSlice } from './songsList/songsListSlice';
import { userSlice } from './user/userSlice';

const rootReducers = combineReducers({
	songsListReducer: songsListSlice.reducer,
	userReducer: userSlice.reducer,
	appReducer: appSlice.reducer,
	chatReducer: chatSlice.reducer,
});

const persistConfig = {
	key: APP.name,
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);
