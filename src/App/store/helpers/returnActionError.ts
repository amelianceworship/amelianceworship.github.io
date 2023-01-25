import type { ErrorResponse } from '~types/api/google/firebase/commons/ErrorResponse';

import { rejectError } from './rejectError';

export function returnActionError(response: ErrorResponse) {
	return { error: response.error?.toString() || rejectError.error };
}
