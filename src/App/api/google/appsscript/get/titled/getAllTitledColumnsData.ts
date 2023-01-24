import { doGet } from '../../base/doGet';
import type { DataTitledResponse } from '../../types/types';

export interface GetAllTitledColumnsData {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
}

export interface GetAllTitledColumnsDataResponse {
	status: 'success' | 'error';
	data: DataTitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'TITLED';
		titles: string[];
		rowsCount: number;
		columnsCount: number;
	};
	error?: string;
}

export async function getAllTitledColumnsData({
	spreadsheetId, sheetIndex, sheetName,
}: GetAllTitledColumnsData) {
	return doGet({
		spreadsheetId, sheetIndex, sheetName, type: 'TITLED',
	}).then((data) => data as GetAllTitledColumnsDataResponse);
}
