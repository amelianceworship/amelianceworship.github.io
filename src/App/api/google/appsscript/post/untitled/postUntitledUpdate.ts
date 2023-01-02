import { doPost } from '../../base/doPost';
import { DataUntitledResponse } from '../../types/types';

export interface PostUntitledUpdate {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	col: number;
	row: number;
	value: number | string;

}

export interface PostUntitledUpdateResponse {
	status: 'success' | 'partial' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED_UPDATE';
		indexesParams: Record<number, unknown>;
		length: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function postUntitledUpdate({
	spreadsheetId, sheetIndex, sheetName, col, row, value,
}: PostUntitledUpdate) {
	return doPost({
		spreadsheetId, sheetIndex, sheetName, col, row, value, type: 'UNTITLED_UPDATE',
	}).then((data) => data as PostUntitledUpdateResponse);
}
