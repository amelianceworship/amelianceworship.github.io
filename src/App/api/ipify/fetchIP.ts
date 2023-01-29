import { returnError } from '~api/google/firebase/helpers/returnError';

const filePath = 'src/App/api/ipify/fetchIP.ts';

export async function fetchIP() {
	try {
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		return { ip: data.ip, status: 'success' };
	} catch (error) {
		return returnError(filePath, error);
	}
}
