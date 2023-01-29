export function isMatchPath(path: string, matchString: string) {
	return !path.split('/')[2] && path.split('/')[1] === matchString;
}
