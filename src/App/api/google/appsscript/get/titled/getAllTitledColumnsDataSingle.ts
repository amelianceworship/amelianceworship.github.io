import { doGet } from '../../base/doGet';
import type { DataTitledResponse } from '../../types/types';

export interface GetAllTitledColumnsDataSingle {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
}

export interface GetAllTitledColumnsDataSingleResponse {
	status: 'success' | 'error';
	data: DataTitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'TITLED_SINGLE';
		titles: string[];
		rowsCount: number;
		columnsCount: number;
	};
	error?: string;
}

export async function getAllTitledColumnsDataSingle({
	spreadsheetId, sheetIndex, sheetName,
}: GetAllTitledColumnsDataSingle) {
	return doGet({
		spreadsheetId, sheetIndex, sheetName, type: 'TITLED_SINGLE',
	}).then((data) => data as GetAllTitledColumnsDataSingleResponse);
}
