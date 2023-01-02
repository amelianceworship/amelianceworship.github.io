import { api } from '~api/index';
import { GOOGLE_SPREADSHEETS_IDS } from '~constants/GOOGLE_SPREADSHEETS_IDS';

import { getClientInfo } from './getClientInfo';

export async function sendAnalyticsData() {
	const response = await getClientInfo();

	const {
		ip,
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
	} = response;

	await api.google.appsscript.postTitledColumnsDataByTitles({
		spreadsheetId: GOOGLE_SPREADSHEETS_IDS.analytics,
		titlesParams: {
			ip,
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
	});
}
