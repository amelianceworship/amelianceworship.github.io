import { useState } from 'react';

import { clearLocalStorageAndReload } from '~helpers/clearLocalStorageAndReload';
import { appSlice } from '~store/app/appSlice';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

import { Button } from '~/ameliance-ui/components/Button';
import { Icon } from '~/ameliance-ui/components/Icon';
import { MoonIcon } from '~/ameliance-ui/components/icons/MoonIcon';
import { MoreVerticalIcon } from '~/ameliance-ui/components/icons/MoreVerticalIcon';
import { RefreshCcwIcon } from '~/ameliance-ui/components/icons/RefreshCcwIcon';
import { RotateCcwIcon } from '~/ameliance-ui/components/icons/RotateCcwIcon';
import { SunIcon } from '~/ameliance-ui/components/icons/SunIcon';
import {
	Menu, MenuContainer, MenuDivider, MenuItem,
} from '~/ameliance-ui/components/Menu';
import { Typography } from '~/ameliance-ui/components/Typography';
import { toggleTheme } from '~/ameliance-ui/scripts/toggleTheme';

export function Settings() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { theme } = useTypedSelector((state) => state.appReducer);
	const { actions } = appSlice;
	const dispatch = useTypedDispatch();

	const handelIconMenuClick = () => {
		setIsMenuOpen(true);
	};

	const handelMenuClose = () => {
		setIsMenuOpen(false);
	};

	const handleResetMenuItemOnClick = () => {
		setIsMenuOpen(false);
		clearLocalStorageAndReload();
	};

	const handleReloadSongsLIstMenuItemOnClick = () => {
		setIsMenuOpen(false);
		dispatch(fetchSongsList());
	};

	const handleThemeMenuItemOnClick = () => {
		const newTheme = toggleTheme();
		dispatch(actions.setTheme(newTheme));
	};

	return (
		<MenuContainer>
			<Menu
				isOpen={isMenuOpen}
				onClick={handelMenuClose}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
				menuOrigin={{ horizontal: 'right', vertical: 'top' }}
				preventItemClickClose
			>
				<MenuItem onClick={handleResetMenuItemOnClick}>
					<Icon><RotateCcwIcon /></Icon>
					<Typography component="p1">
						Скинути налаштування
					</Typography>
				</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleReloadSongsLIstMenuItemOnClick}>
					<Icon><RefreshCcwIcon /></Icon>
					<Typography component="p1">
						Оновити список пісень
					</Typography>
				</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleThemeMenuItemOnClick}>
					<Icon>{theme === 'dark' ? <MoonIcon /> : <SunIcon />}</Icon>
					<Typography component="p1">
						Тема:
						{' '}
						{theme === 'dark' ? 'темна' : 'світла'}
					</Typography>
				</MenuItem>
			</Menu>
			<Button type="text" onClick={handelIconMenuClick}>
				<MoreVerticalIcon />
			</Button>
		</MenuContainer>
	);
}
