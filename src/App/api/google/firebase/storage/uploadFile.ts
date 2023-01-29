import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { storage } from '../firebase';
import { returnError } from '../helpers/returnError';

export interface UploadFile {
	refName: string;
	file: File;
}

export interface UploadFileResponse extends SuccessResponse {
	downloadURL: string;
}

const filePath = 'src/App/api/google/firebase/storage/uploadFile.ts';

export async function uploadFile({
	refName, file,
}: UploadFile): Promise<UploadFileResponse | ErrorResponse> {
	const storageRef = ref(storage, refName);
	try {
		await uploadBytesResumable(storageRef, file);
		const downloadURL = await getDownloadURL(storageRef);
		return { downloadURL, status: 'success' };
	} catch (error) {
		return returnError(filePath, error);
	}
}

// refactor default code
// https://stackoverflow.com/questions/71555134/cant-get-image-url-after-upload-a-file-to-firebase
