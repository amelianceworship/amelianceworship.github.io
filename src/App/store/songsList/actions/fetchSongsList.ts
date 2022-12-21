import { createAsyncThunk } from '@reduxjs/toolkit';

import { asm } from '~/asm-ts-scripts/combineListToSortedArray';
import { api } from '~api/index';
import { TABLE_NAMES } from '~app/constants/TABLE_NAMES';
import { sheetId } from '~store/base/sheetId';
import { rejectErrorMessage } from '~store/helpers/rejectErrorMessage';

export const fetchSongsList = createAsyncThunk(
	'songsList/fetchSongsList',
	async (_, thunkAPI) => {
		try {

			const responseGeneral = await api.google.sheets.getSheetData({
				sheetId, pageTitle: TABLE_NAMES.general,
			});
			const responseStudy = await api.google.sheets.getSheetData({
				sheetId, pageTitle: TABLE_NAMES.study,
			});
			const responseChristmas = await api.google.sheets.getSheetData({
				sheetId, pageTitle: TABLE_NAMES.christmas,
			});
			const responseEaster = await api.google.sheets.getSheetData({
				sheetId, pageTitle: TABLE_NAMES.easter,
			});
			const responseDefer = await api.google.sheets.getSheetData({
				sheetId, pageTitle: TABLE_NAMES.defer,
			});

			const listOfGeneral = api.google.sheets.convertors
				.convertDataFromOneColumnSheet(responseGeneral) as string[];
			const listOfStudy = api.google.sheets.convertors
				.convertDataFromOneColumnSheet(responseStudy) as string[];
			const listOfChristmas = api.google.sheets.convertors
				.convertDataFromOneColumnSheet(responseChristmas) as string[];
			const listOfEaster = api.google.sheets.convertors
				.convertDataFromOneColumnSheet(responseEaster) as string[];
			const listOfDefer = api.google.sheets.convertors
				.convertDataFromOneColumnSheet(responseDefer) as string[];

			return {
				[TABLE_NAMES.general]:
				asm.combineListToSortedArray(listOfGeneral),
				[TABLE_NAMES.study]:
				asm.combineListToSortedArray(listOfStudy),
				[TABLE_NAMES.christmas]:
				asm.combineListToSortedArray(listOfChristmas),
				[TABLE_NAMES.easter]:
				asm.combineListToSortedArray(listOfEaster),
				[TABLE_NAMES.defer]:
				asm.combineListToSortedArray(listOfDefer),
			};

		} catch (error) {
			return thunkAPI.rejectWithValue(rejectErrorMessage);
		}
	},
);
