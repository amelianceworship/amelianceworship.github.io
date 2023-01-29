export function appError(errorPath: string, error: unknown) {
	// eslint-disable-next-line no-console
	console.error('AmelianceWorship >', `${errorPath}:`, error);
}
