import { returnError } from '~api/google/firebase/helpers/returnError';

const filePath = 'src/App/helpers/writeTextToClipboard.ts';

export async function writeTextToClipboard(text: string) {
	if (text) {
		try {
			await navigator.clipboard.writeText(text);
			return { status: 'success' };
		} catch (error) {
			return returnError(filePath, error);
		}
	}
	return { status: 'error' };
}
