import { api } from '~api/index';

import { getClientInfo } from './getClientInfo';

export async function sendAnalyticsData() {
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
	} = getClientInfo();

	await api.google.appsscript.doPost({
		listName: 'songslist',
		dataParams: {
			ip: ip.toString(),
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
