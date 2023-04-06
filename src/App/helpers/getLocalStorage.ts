import { APP } from '~constants/APP';

import { appLog } from './appLog';

const APP_NAME = APP.name;

export function getLocalStorage<T>(store: string, key: string, initValue?: T) {
	const setLocalStorageItem = <K, D>(storeObj: Record<string, K>, value: D) => {
		localStorage.setItem(APP_NAME, JSON.stringify({
			...storeObj,
			[store]: {
				...storeObj[store],
				[key]: value,
			},
		}));
	};

	try {
		const appStorage = localStorage.getItem(APP_NAME);
		const appStorageObj = appStorage ? JSON.parse(appStorage) : {};
		if (!appStorage) {
			if (initValue) setLocalStorageItem(appStorageObj, initValue);
			return initValue || null;
		}
		const storageValue = appStorageObj[store][key];
		if (!storageValue) {
			setLocalStorageItem(appStorageObj, initValue);
			return initValue || null;
		}
		return storageValue;
	} catch (error) {
		appLog('getLocalStorage', error);
		return initValue;
	}
}
