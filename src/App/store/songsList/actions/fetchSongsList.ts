import { createAsyncThunk } from '@reduxjs/toolkit';

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

			return {
				[TABLE_NAMES.general]:
				api.google.sheets.convertors.convertDataFromOneColumnSheet(responseGeneral),
				[TABLE_NAMES.study]:
				api.google.sheets.convertors.convertDataFromOneColumnSheet(responseStudy),
				[TABLE_NAMES.christmas]:
				api.google.sheets.convertors.convertDataFromOneColumnSheet(responseChristmas),
				[TABLE_NAMES.easter]:
				api.google.sheets.convertors.convertDataFromOneColumnSheet(responseEaster),
				[TABLE_NAMES.defer]:
				api.google.sheets.convertors.convertDataFromOneColumnSheet(responseDefer),
			};

		} catch (error) {
			return thunkAPI.rejectWithValue(rejectErrorMessage);
		}
	},
);
