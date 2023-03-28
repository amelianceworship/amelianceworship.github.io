import { useState } from 'react';

import { appSlice } from '~store/app/appSlice';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';

import { Button } from '~/ameliance-ui/components/Button';
import { SettingsIcon } from '~/ameliance-ui/components/icons/SettingsIcon';
import { Menu, MenuContainer, MenuItem } from '~/ameliance-ui/components/Menu';
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
				<MenuItem onClick={handleThemeMenuItemOnClick}>
					<Typography component="p1">
						Тема:
						{' '}
						{theme === 'dark' ? 'темна' : 'світла'}
					</Typography>
				</MenuItem>
			</Menu>
			<Button type="text" onClick={handelIconMenuClick}>
				<SettingsIcon />
			</Button>
		</MenuContainer>
	);
}
