import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import asm from 'asm-ts-scripts';

import { mp3List } from '~app/data/mp3List';

const audioFilesList: string[] = mp3List.trim().split('\n').map((song) => song.trim());

interface MusicPlayerSlice {
	normalOrderAudioFilesList: string[];
	audioFilesList: string[];
	currentSong: string | null;
	isPlaying: boolean;
	isPlayerShow: boolean;
}

const initMusicPlayerSlice: MusicPlayerSlice = {
	normalOrderAudioFilesList: audioFilesList,
	audioFilesList,
	currentSong: null,
	isPlaying: false,
	isPlayerShow: false,
};

export const musicPlayerSlice = createSlice({
	name: 'musicPlayer',
	initialState: initMusicPlayerSlice,
	reducers: {
		setCurrentSong(state, action: PayloadAction<MusicPlayerSlice['currentSong']>) {
			state.currentSong = action.payload;
		},
		setShuffleFilesList(state) {
			state.audioFilesList = asm.shuffleArray(state.audioFilesList);
		},
		setNormalFilesList(state) {
			state.audioFilesList = state.normalOrderAudioFilesList;
		},
		setIsPlaying(state, action: PayloadAction<MusicPlayerSlice['isPlaying']>) {
			state.isPlaying = action.payload;
		},
		showPlayer(state) {
			state.isPlayerShow = true;
		},
		hidePlayer(state) {
			state.isPlayerShow = false;
		},
	},
});
