import { createAsyncThunk } from '@reduxjs/toolkit';

import { groupBy, removeEmptyValues, sortArrayLocalCompare } from '~/ameliance-scripts';
import type { DataTitledValues } from '~api/google/appsscript/types/types';
import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';

const GOOGLE_SONGSLIST_TABLE_ID = import.meta.env.VITE_GOOGLE_SONGSLIST_TABLE_ID;

function prepareData(data: DataTitledValues) {
	let combinedListOfData;
	if (data) {
		const listOfDataSorted = sortArrayLocalCompare(data, 'value');
		const listOfDataCleaned = removeEmptyValues(listOfDataSorted, 'value');
		combinedListOfData = groupBy(listOfDataCleaned, 'value');
	}
	return combinedListOfData;
}

// TODO: move types to slice
export interface SongItem {
	position: string;
	value: string;
}
export type SongsGroup = [string, SongItem[]];
export type TableOfGroups = [string, Array<SongsGroup>];
export type SongsListData = Array<TableOfGroups>;

export interface SongsListResponseData {
	songsList: SongsListData;
	listTitles: string[];
}

export type CreateAsyncThunkReturned = SongsListResponseData;
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const fetchSongsListData = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'songsList/fetchSongsListData',
	async (_, thunkAPI) => {
		try {
			const response = await api.google.appsscript.getAllTitledColumnsDataSingle({
				spreadsheetId: GOOGLE_SONGSLIST_TABLE_ID,
				sheetName: 'common',
			});

			const responseTables = Object.entries(response.data);
			const tableNames = [];
			const songsList = responseTables.map((table) => {
				const tableName = table[0];
				tableNames.push(tableName);
				const tableData = prepareData(table[1].values);
				return [tableName, tableData];
			});

			return {
				songsList,
				listTitles: response.info.titles,
			} as SongsListResponseData;
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
