import { doGet } from '../../base/doGet';
import { DataUntitledResponse } from '../../types/types';

export interface GetAllUntitledColumnsDataSingle {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
}

export interface GetAllUntitledColumnsDataSingleResponse {
	status: 'success' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED_SINGLE';
		rowCounts: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function getAllUntitledColumnsDataSingle({
	spreadsheetId, sheetIndex, sheetName,
}: GetAllUntitledColumnsDataSingle) {
	return doGet({
		spreadsheetId, sheetIndex, sheetName, type: 'UNTITLED_SINGLE',
	}).then((data) => data as GetAllUntitledColumnsDataSingleResponse);
}
