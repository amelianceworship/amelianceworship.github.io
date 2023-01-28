import { createAsyncThunk } from '@reduxjs/toolkit';
import asm from 'asm-ts-scripts';

import { api } from '~api/index';
import { TABLE_NAMES } from '~app/constants/TABLE_NAMES';
import { GOOGLE_SPREADSHEETS_IDS } from '~constants/GOOGLE_SPREADSHEETS_IDS';
import { rejectError } from '~store/helpers/rejectError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';

// TODO: add export types to library

type ObjItem = Record<string, string | number>;
type GroupOfObj = [string, ObjItem[]];
type GroupBy = GroupOfObj[];

function prepareData(data: { position: string; value: string }[] | null): GroupBy {
	let combinedListOfData;
	if (data) {
		const listOfDataSorted = asm.sortArrayLocalCompare(data, 'value');
		const listOfDataCleaned = asm.removeEmptyValues(listOfDataSorted, 'value');
		combinedListOfData = asm.groupBy(listOfDataCleaned, 'value');
	}
	return combinedListOfData as GroupBy;
}
export type SongsListData = Partial<Record<string, GroupBy>>;
export type CreateAsyncThunkReturned = SongsListData | ErrorString;
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const fetchSongsList = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'songsList/fetchSongsList',
	async (_, thunkAPI) => {
		try {
			const response = await api.google.appsscript.getAllTitledColumnsDataSingle({
				spreadsheetId: GOOGLE_SPREADSHEETS_IDS.SONGSLIST,
				sheetName: 'common',
			});

			return {
				[TABLE_NAMES.GENERAL]: prepareData(response.data.general.values),
				[TABLE_NAMES.STUDY]: prepareData(response.data.study.values),
				[TABLE_NAMES.CHRISTMAS]: prepareData(response.data.christmas.values),
				[TABLE_NAMES.EASTER]: prepareData(response.data.easter.values),
				[TABLE_NAMES.DEFER]: prepareData(response.data.defer.values),
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(rejectError);
		}
	},
);
