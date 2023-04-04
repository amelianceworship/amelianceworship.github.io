import { createSlice } from '@reduxjs/toolkit';

import { APP } from '~constants/APP';

interface AppSlice {
	theme: 'light' | 'dark';
	fullscreen: boolean;
	version: string;
}

const initialState: AppSlice = {
	theme: 'dark',
	fullscreen: true,
	version: APP.version,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setTheme(state, action) {
			state.theme = action.payload;
		},
		toggleTheme(state) {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
		toggleFullscreen(state) {
			state.fullscreen = !state.fullscreen;
		},
	},
});
