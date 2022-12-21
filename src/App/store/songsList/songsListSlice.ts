import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TABLE_NAMES } from '~app/constants/TABLE_NAMES';

import { fetchSongsList } from './actions/fetchSongsList';

interface SongsList {
	[key: string]: [string, string[]][];
}

interface SongsListSlice {
	isLoading: boolean;
	error: string;
	songsList: SongsList;
	songsTableNames: string[];
}

const initSongsListSlice: SongsListSlice = {
	isLoading: false,
	error: '',
	songsList: {} as SongsList,
	songsTableNames: [
		TABLE_NAMES.general,
		TABLE_NAMES.study,
		TABLE_NAMES.christmas,
		TABLE_NAMES.easter,
		TABLE_NAMES.defer,
	],
};

export const songsListSlice = createSlice({
	name: 'songsList',
	initialState: initSongsListSlice,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSongsList.pending, (state) => {
				state.isLoading = true;
				state.error = '';
				state.songsList = {} as SongsList;
			})
			.addCase(
				fetchSongsList.fulfilled,
				(state, action: PayloadAction<SongsList | unknown>) => {
					if (action.payload && typeof action.payload === 'object') {
						state.songsList = action?.payload as SongsList;
					}
					state.isLoading = false;
				},
			)
			.addCase(fetchSongsList.rejected, (state, action: PayloadAction<unknown>) => {
				(state.error as unknown) = action.payload;
				state.isLoading = false;
			});

	},
});
