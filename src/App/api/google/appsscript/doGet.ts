import { baseURL } from './baseURL';

interface DoGet {
	spreadsheetId: string;
	neededSheet?: string;
	columns?: string[];
	type?: string;
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
		type?: string;
		found?: string[];
		headings?: string[];
		missed?: string[];
		length?: string[];
		columns?: string[];
	};
	error?: string;
}

export async function doGet({
	spreadsheetId, neededSheet, columns, type,
}: DoGet) {
	const URLParams = new URLSearchParams();
	if (spreadsheetId) URLParams.append('spreadsheetId', spreadsheetId);
	if (neededSheet) URLParams.append('neededSheet', neededSheet);
	if (columns) URLParams.append('columns', JSON.stringify(columns));
	if (type) URLParams.append('type', type);

	return fetch(`${baseURL}?${URLParams}`)
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
