import a from '~/ameliance-scripts';
import { APP } from '~constants/APP';

export function returnError(error: unknown): string {
	return a.lab.returnError(error, APP.name);
}
