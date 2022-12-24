import { baseURL } from './baseURL';

export async function doGet() {
	return fetch(baseURL)
		.then((response) => response.text())
		.then((textData) => JSON.parse(textData))
		.then((data) => data)
		// eslint-disable-next-line no-console
		.catch((error) => console.log('setData', error));
}
