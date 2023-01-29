import { doPost } from '../../base/doPost';
import type { DataUntitledResponse } from '../../types/types';

export interface PostUntitledColumnsDataByIndexes {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	indexesParams: Record<number, unknown>;
}

export interface PostUntitledColumnsDataByIndexesResponse {
	status: 'success' | 'partial' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED';
		indexesParams: Record<number, unknown>;
		length: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function postUntitledColumnsDataByIndexes({
	spreadsheetId, sheetIndex, sheetName, indexesParams,
}: PostUntitledColumnsDataByIndexes) {
	return doPost({
		spreadsheetId, sheetIndex, sheetName, indexesParams, type: 'UNTITLED',
	}).then((data) => data as PostUntitledColumnsDataByIndexesResponse);
}
