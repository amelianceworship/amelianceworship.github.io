import { getBrowser } from './getBrowser';
import { getIsMobile } from './getIsMobile';

export interface ClientInfo {
	time: Date;
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

export function getClientInfo(): ClientInfo {
	return {
		time: new Date(),
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
