import { APP } from '~constants/APP';

export function returnError(error: unknown): string {
	let message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!';
	if (error) {
		if (typeof error === 'string') message = error;
		if (error instanceof Error) message = error.message;
	}
	// eslint-disable-next-line no-console
	console.error(`${APP.name} >`, `${message}\n`, new Error().stack?.split('\n')[2]);
	return message;
}
