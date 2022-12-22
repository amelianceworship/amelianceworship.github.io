import { api } from '~api/index';

import { getClientInfo } from './getClientInfo';

export async function sendAnalyticsData() {
	const {
		page,
		time,
		language,
		languages,
		browser,
		mobile,
		screenHeight,
		screenWidth,
		viewportHeight,
		viewportWidth,
	} = getClientInfo();

	await api.sheetbest.addOneLineToTheSheet(
		import.meta.env.VITE_BESTSHEET_ANALYTICS_SHEET_ID,
		{
			page,
			time,
			language,
			languages: languages.join(' | '),
			browser: browser.name,
			version: browser.version,
			mobile,
			screenHeight,
			screenWidth,
			viewportHeight,
			viewportWidth,
		},
	);
}
