import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { TABLE_NAMES } from '~app/constants/TABLE_NAMES';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';

import type { SongsListData } from './actions/fetchSongsList';
import { fetchSongsList } from './actions/fetchSongsList';

// type SongsList = Record<string, [string, { position: string; value: string }[]][]>;

interface SongsListSlice {
	isLoading: boolean;
	error: string;
	songsList: SongsListData;
	songsTableNames: string[];
}

const initSongsListSlice: SongsListSlice = {
	isLoading: false,
	error: '',
	songsList: {} as SongsListData,
	songsTableNames: [
		TABLE_NAMES.GENERAL,
		TABLE_NAMES.STUDY,
		TABLE_NAMES.CHRISTMAS,
		TABLE_NAMES.EASTER,
		TABLE_NAMES.DEFER,
	],
};

export const songsListSlice = createSlice({
	name: 'songsList',
	initialState: initSongsListSlice,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSongsList.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				state.songsList = {} as SongsListData;
			})
			.addCase(
				fetchSongsList.fulfilled,
				(state, action: PayloadAction<SongsListData | ErrorString>) => {
					if ('error' in action.payload) {
						state.error = (action.payload as ErrorString).error;
					} else {
						state.songsList = action.payload;
					}
					state.isLoading = false;
				},
			)
			.addCase(fetchSongsList.rejected, (state, action: PayloadAction<unknown>) => {
				state.error = (action.payload as ErrorString).error;
				state.isLoading = false;
			});
	},
});
