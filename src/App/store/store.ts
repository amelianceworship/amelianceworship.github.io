import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { MigrationManifest, PersistedState } from 'redux-persist';
import {
	createMigrate,
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
import { musicPlayerSlice } from './musicPlayer/musicPlayerSlice';
import { songsListSlice } from './songsList/songsListSlice';
import { userSlice } from './user/userSlice';
import { userInfoSlice } from './userInfo/userInfoSlice';
import { usersSlice } from './users/usersSlice';

const rootReducer = combineReducers({
	appReducer: appSlice.reducer,
	songsListReducer: songsListSlice.reducer,
	userReducer: userSlice.reducer,
	usersReducer: usersSlice.reducer,
	userInfoReducer: userInfoSlice.reducer,
	musicPlayerReducer: musicPlayerSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
type PersistedRootState = Pick<RootState, 'appReducer' | 'songsListReducer'>;

const migration: MigrationManifest = {
	0: (state: PersistedState): PersistedState => state,
	1: (state: PersistedState): PersistedState => {
		const newState = { ...state } as PersistedRootState;
		return {
			...newState,
			appReducer: {
				...newState.appReducer,
				tea: undefined,
			},
		} as unknown as PersistedState;
	},
};

const persistConfig = {
	key: APP.name,
	storage,
	whitelist: ['appReducer', 'songsListReducer'],
	version: 0,
	migrate: createMigrate(migration, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);
