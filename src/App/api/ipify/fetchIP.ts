export async function fetchIP() {
	return fetch('https://api.ipify.org?format=json')
		.then((response) => response.json())
		.then((data) => data.ip)
		// eslint-disable-next-line no-console
		.catch((error) => console.error('amelianceworship', 'fetchIP:', error));
}
