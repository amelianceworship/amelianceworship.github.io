import { doGet } from '../../base/doGet';
import { DataTitledResponse } from '../../types/types';

export interface GetTitledColumnsDataByTitles {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	columnTitles: string[];
}

export interface GetTitledColumnsDataByTitlesResponse {
	status: 'success' | 'partial' | 'error';
	data: DataTitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		titles: string[];
		rowsCount: number;
		columnsCount: number;
		type: 'TITLED';

		columnTitles: string[];

		found?: string[];
		missed?: string[];
	};
	error?: string;
}

export async function getTitledColumnsDataByTitles({
	spreadsheetId, sheetIndex, sheetName, columnTitles,
}: GetTitledColumnsDataByTitles) {
	return doGet({
		spreadsheetId, sheetIndex, sheetName, columnTitles, type: 'TITLED',
	}).then((data) => data as GetTitledColumnsDataByTitlesResponse);
}
