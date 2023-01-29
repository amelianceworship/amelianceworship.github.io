import { doPost } from '../../base/doPost';
import type { DataUntitledResponse } from '../../types/types';

export interface PostAllUntitledParamsAsOneRow {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	indexesParams: Record<number, unknown>;
}

export interface PostAllUntitledParamsAsOneRowResponse {
	status: 'success' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED_ONE_ROW';
		indexesParams: Record<number, unknown>;
		length: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function postAllUntitledParamsAsOneRow({
	spreadsheetId, sheetIndex, sheetName, indexesParams,
}: PostAllUntitledParamsAsOneRow) {
	return doPost({
		spreadsheetId, sheetIndex, sheetName, indexesParams, 	type: 'UNTITLED_ONE_ROW',
	}).then((data) => data as PostAllUntitledParamsAsOneRowResponse);
}
