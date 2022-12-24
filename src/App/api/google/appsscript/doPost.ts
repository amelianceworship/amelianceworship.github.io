import { baseURL } from './baseURL';

interface DoPost {
	listName: string;
	dataParams: Record<string, unknown>;
	action?: string;
}

export async function doPost({ listName, dataParams, action }: DoPost) {
	const URLParams = new URLSearchParams();
	if (listName) URLParams.append('listName', listName);
	if (dataParams) URLParams.append('dataParams', JSON.stringify(dataParams));
	if (action) URLParams.append('action', action);

	return fetch(`${baseURL}?${URLParams}`, {
		method: 'POST',
	})
		.then((response) => response.text())
		.then((textData) => JSON.parse(textData))
		.then((data) => data)
		// eslint-disable-next-line no-console
		.catch((error) => console.log('setData', error));
}
