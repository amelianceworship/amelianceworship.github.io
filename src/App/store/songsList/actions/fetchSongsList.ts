import { createAsyncThunk } from '@reduxjs/toolkit';
import asm from 'asm-ts-scripts';

import { api } from '~api/index';
import { TABLE_NAMES } from '~app/constants/TABLE_NAMES';
import { GOOGLE_SPREADSHEETS_IDS } from '~constants/GOOGLE_SPREADSHEETS_IDS';
import { rejectErrorMessage } from '~store/helpers/rejectErrorMessage';

function prepareData(data: { position: string; value: string }[] | null) {
	let combinedListOfData;
	if (data) {
		const listOfDataSorted = asm.sortArrayLocalCompare(data, 'value');
		const listOfDataCleaned = asm.removeEmptyValues(listOfDataSorted, 'value');
		combinedListOfData = asm.groupBy(listOfDataCleaned, 'value');
	}
	return combinedListOfData;
}

export const fetchSongsList = createAsyncThunk(
	'songsList/fetchSongsList',
	async (_, thunkAPI) => {

		try {
			const response = await api.google.appsscript.getAllTitledColumnsDataSingle({
				spreadsheetId: GOOGLE_SPREADSHEETS_IDS.songslist,
				sheetName: 'common',
			});

			return {
				[TABLE_NAMES.general]: prepareData(response.data.general.values),
				[TABLE_NAMES.study]: prepareData(response.data.study.values),
				[TABLE_NAMES.christmas]: prepareData(response.data.christmas.values),
				[TABLE_NAMES.easter]: prepareData(response.data.easter.values),
				[TABLE_NAMES.defer]: prepareData(response.data.defer.values),
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(rejectErrorMessage);
		}
	},
);
