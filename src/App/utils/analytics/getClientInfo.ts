import { api } from '~api/index';

import { getBrowser } from './getBrowser';
import { getMobile } from './getMobile';

export interface ClientInfo {
	ip: string;
	time: string;
	timezone: number;
	language: string;
	languages: string[];
	mobile: string | null;
	page: string;
	referrer: string;
	browser: {
		name: string;
		version: string;
	};
	screenWidth: number;
	screenHeight: number;
	viewportWidth: number;
	viewportHeight: number;
}

export async function getClientInfo(): Promise<ClientInfo> {
	let ip = '';
	try {
		const response = await api.ipify.fetchIP();
		ip = response.toString();
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('amelianceworship', 'getClientInfo/ip', error);
	}

	return {
		ip,
		time: new Date().toString(),
		timezone: (new Date()).getTimezoneOffset() / 60,
		language: window.navigator.language,
		languages: [...window.navigator.languages],
		mobile: getMobile() || '',
		page: window.location.pathname,
		referrer: document.referrer,
		browser: getBrowser(),
		screenWidth: window.screen.width,
		screenHeight: window.screen.height,
		viewportWidth: window.innerWidth,
		viewportHeight: window.innerHeight,
	};
}
