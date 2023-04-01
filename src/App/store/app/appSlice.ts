import { createSlice } from '@reduxjs/toolkit';

interface AppSlice {
	theme: 'light' | 'dark';
	fullscreen: boolean;
}

const initialState: AppSlice = {
	theme: 'dark',
	fullscreen: true,
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
