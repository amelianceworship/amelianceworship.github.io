import { APP } from '~constants/APP';
import { returnError } from '~helpers/returnError';

const APP_NAME = APP.name;

export function setLocalStorage<T>(store: string, group: string, value: T) {
	const setLocalStorageItem	= <
		K extends Record<string, Record<string, string>>,
		J extends Record<string, K>,
		D>(storeObj: J, localValue: D) => {
		const newStoreObj = {
			...storeObj,
			[store]: {
				...storeObj?.[store],
				[group]: {
					...storeObj?.[store]?.[group],
					...localValue || null,
				},
			},
		};
		localStorage.setItem(APP_NAME, JSON.stringify(newStoreObj));
	};

	try {
		const appStorage = localStorage.getItem(APP_NAME);
		const appStorageObj = appStorage ? JSON.parse(appStorage) : {};
		setLocalStorageItem(appStorageObj, value);
	} catch (error) {
		returnError(error);
	}
}
