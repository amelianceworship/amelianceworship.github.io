import { ROUTES } from '~constants/ROUTES';

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
	},
];
