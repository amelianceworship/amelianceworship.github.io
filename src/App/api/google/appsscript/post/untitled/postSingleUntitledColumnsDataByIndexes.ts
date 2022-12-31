import { doPost } from '../../base/doPost';
import { DataUntitledResponse } from '../../types/types';

export interface PostSingleUntitledColumnsDataByIndexes {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	indexesParams: Record<number, unknown>;
}

export interface PostSingleUntitledColumnsDataByIndexesResponse {
	status: 'success' | 'partial' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED_SINGLE';
		indexesParams: Record<number, unknown>;
		length: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function postSingleUntitledColumnsDataByIndexes({
	spreadsheetId, sheetIndex, sheetName, indexesParams,
}: PostSingleUntitledColumnsDataByIndexes) {
	return doPost({
		spreadsheetId, sheetIndex, sheetName, indexesParams, 	type: 'UNTITLED_SINGLE',
	}).then((data) => data as PostSingleUntitledColumnsDataByIndexesResponse);
}
