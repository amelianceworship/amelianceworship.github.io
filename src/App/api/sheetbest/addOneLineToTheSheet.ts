import { baseURL } from './baseURL';

export async function addOneLineToTheSheet<TYPE>(sheetId: string, data: TYPE) {

	return fetch(`${baseURL}${sheetId}`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		// eslint-disable-next-line no-console
		.catch((error) => console.error('addOneLineToTheSheet:', error));
}
