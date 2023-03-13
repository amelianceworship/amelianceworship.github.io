import { appError } from '~helpers/appError';
import { appLog } from '~helpers/appLog';

import type { DoGet, Response } from '../types/types';
import { baseURL } from './baseURL';

export async function doGet({
	spreadsheetId, sheetName, sheetIndex, columnTitles, columnIndexes, type,
}: DoGet) {
	const URLParams = new URLSearchParams();
	if (spreadsheetId) URLParams.append('spreadsheetId', spreadsheetId);
	if (sheetName) URLParams.append('sheetName', sheetName);
	if (sheetIndex) URLParams.append('sheetIndex', sheetIndex.toString());
	if (columnTitles) URLParams.append('columnTitles', JSON.stringify(columnTitles));
	if (columnIndexes) URLParams.append('columnIndexes', JSON.stringify(columnIndexes));
	if (type) URLParams.append('type', type);

	return fetch(`${baseURL}?${URLParams}`)
		.then((response) => response.text())
		.then((textData) => JSON.parse(textData))
		.then((data: Response) => {
			if (data.status !== 'success') {
				// eslint-disable-next-line no-console
				appLog('doGet', 'status:', data.status);
				// eslint-disable-next-line no-console
				appLog('doGet', 'info:', data.info);
				// eslint-disable-next-line no-console
				appLog('doGet', 'error:', data.error);
			}
			return data;
		})
		// eslint-disable-next-line no-console
		.catch((error) => appError('doGet', error));
}
