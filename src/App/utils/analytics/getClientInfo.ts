import { api } from '~api/index';

import { getBrowser } from './getBrowser';
import { getIsMobile } from './getIsMobile';

export interface ClientInfo {
	ip: string;
	time: string;
	timezone: number;
	language: string;
	languages: string[];
	mobile: boolean;
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

const ip = await api.ipify.fetchIP() as string;
export function getClientInfo(): ClientInfo {
	return {
		ip,
		time: new Date().toString(),
		timezone: (new Date()).getTimezoneOffset() / 60,
		language: window.navigator.language,
		languages: [...window.navigator.languages],
		mobile: getIsMobile(),
		page: window.location.pathname,
		referrer: document.referrer,
		browser: getBrowser(),
		screenWidth: window.screen.width,
		screenHeight: window.screen.height,
		viewportWidth: window.innerWidth,
		viewportHeight: window.innerHeight,
	};
}
