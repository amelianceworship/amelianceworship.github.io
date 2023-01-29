import { doGet } from '../../base/doGet';
import type { DataUntitledResponse } from '../../types/types';

export interface GetAllUntitledColumnsData {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
}

export interface GetAllUntitledColumnsDataResponse {
	status: 'success' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED';
		rowCounts: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function getAllUntitledColumnsData({
	spreadsheetId, sheetIndex, sheetName,
}: GetAllUntitledColumnsData) {
	return doGet({
		spreadsheetId, sheetIndex, sheetName, type: 'UNTITLED',
	}).then((data) => data as GetAllUntitledColumnsDataResponse);
}
