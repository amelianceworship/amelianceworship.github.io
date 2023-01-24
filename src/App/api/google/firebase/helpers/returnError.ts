import { appError } from '~helpers/appError';
import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';

export function returnError(errorPath: string, error: unknown): ErrorResponse {
	appError(errorPath, error);
	return { error, status: 'error' };
}
