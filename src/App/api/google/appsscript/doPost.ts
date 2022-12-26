import { baseURL } from './baseURL';

interface DoPost {
	spreadsheetId: string;
	neededSheet?: string;
	dataParams: Record<string, unknown>;
	action?: string;
}

export interface Response {
	status: 'success' | 'partially' | 'error';
	data: {
		[key: string]: {
			colNumber: number;
			values: {
				position: string;
				value: string;
			}[];
		};
	};
	info: {
		spreadsheetId: string;
		neededSheet?: string;
		dataParams: Record<string, unknown>;
		action?: string;
		found?: string[];
		headings?: string[];
		missed?: string[];
		length?: string[];
	};
	error?: string;
}

export async function doPost({
	spreadsheetId, neededSheet, dataParams, action,
}: DoPost) {
	const URLParams = new URLSearchParams();
	if (spreadsheetId) URLParams.append('spreadsheetId', spreadsheetId);
	if (neededSheet) URLParams.append('neededSheet', neededSheet);
	if (dataParams) URLParams.append('dataParams', JSON.stringify(dataParams));
	if (action) URLParams.append('action', action);

	return fetch(`${baseURL}?${URLParams}`, { method: 'POST' })
		.then((response) => response.text())
		.then((textData) => JSON.parse(textData))
		.then((data: Response) => {
			if (data.status !== 'success') {
				console.log(data.status);
				console.log(data.info);
				console.log(data.error);
			}
			return data;
		})
		// eslint-disable-next-line no-console
		.catch((error) => console.log('setData', error));
}
