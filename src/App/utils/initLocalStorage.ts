import { APP_VERSION } from '~app/constants/APP_VERSION';

import { getClientInfo } from './getClientInfo';
import { ClientInfo } from './getClientInfo/getClientInfo';

interface LocalStorageData {
	clientInfo: ClientInfo;
	appVersion: string;
	colorTheme: string;
	isAppUpdated: boolean;
}

export function initLocalStorage() {

	const localStorageData: LocalStorageData = {
		clientInfo: getClientInfo(),
		appVersion: APP_VERSION,
		colorTheme: 'light',
		isAppUpdated: false,
	};

	const currentLocalStorageData = localStorage.getItem('amelianceworship');

	if (currentLocalStorageData) {
		const parsedCurrentLocalStorageData: LocalStorageData = JSON.parse(currentLocalStorageData);

		if (parsedCurrentLocalStorageData.appVersion !== localStorageData.appVersion) {
			localStorageData.isAppUpdated = true;
		}
		localStorage.setItem('amelianceworship', JSON.stringify({
			...parsedCurrentLocalStorageData,
			...{
				clientInfo: localStorageData.clientInfo,
				appVersion: localStorageData.appVersion,
				isAppUpdated: localStorageData.isAppUpdated,
			},
		}));
	} else {
		localStorage.setItem('amelianceworship', JSON.stringify(localStorageData));
	}

}
