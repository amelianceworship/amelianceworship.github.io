import { PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';

interface NavigationItem {
	label: string;
	path: string;
	end: boolean;
}

type NavigationList = NavigationItem[];

export const navigationList: NavigationList = [
	{
		label: 'Головна',
		path: ROUTES.home,
		end: false,
	}, {
		label: 'Список пісень',
		path: ROUTES.songslist,
		end: false,
	}, {
		label: 'Акорди',
		path: ROUTES.chordslist,
		end: false,
	}, {
		label: 'Чат',
		path: PRIVATE_ROUTES.chat,
		end: false,
	}, {
		label: 'Панель адміна',
		path: PRIVATE_ROUTES.admin,
		end: false,
	},
];
