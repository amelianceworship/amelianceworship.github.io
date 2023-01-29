import { doPost } from '../../base/doPost';
import type { DataTitledResponse } from '../../types/types';

export interface PostTitledColumnsDataByIndexes {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	indexesParams: Record<number, unknown>;
}

export interface PostTitledColumnsDataByIndexesResponse {
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

export async function postTitledColumnsDataByIndexes({
	spreadsheetId, sheetIndex, sheetName, indexesParams,
}: PostTitledColumnsDataByIndexes) {
	return doPost({
		spreadsheetId, sheetIndex, sheetName, indexesParams, type: 'TITLED',
	}).then((data) => data as PostTitledColumnsDataByIndexesResponse);
}
