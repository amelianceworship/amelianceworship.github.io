import { doPost } from '../../base/doPost';
import { DataTitledResponse } from '../../types/types';

export interface PostSingleTitledColumnsDataByTitles {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	titlesParams: Record<string, unknown>;
}

export interface PostSingleTitledColumnsDataByTitlesResponse {
	status: 'success' | 'partial' | 'error';
	data: DataTitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		titles: string[];
		rowsCount: number;
		columnsCount: number;
		type: 'TITLED_SINGLE';

		columnTitles: string[];

		found?: string[];
		missed?: string[];
	};
	error?: string;
}

export async function postSingleTitledColumnsDataByTitles({
	spreadsheetId, sheetIndex, sheetName, titlesParams,
}: PostSingleTitledColumnsDataByTitles) {
	return doPost({
		spreadsheetId, sheetIndex, sheetName, titlesParams, type: 'TITLED_SINGLE',
	}).then((data) => data as PostSingleTitledColumnsDataByTitlesResponse);
}
