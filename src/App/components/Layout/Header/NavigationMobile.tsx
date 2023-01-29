import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { PRIVATE_ROUTES, ROUTES } from '~app/constants/ROUTES';
import { Icon } from '~components/Icon';
import { Menu } from '~components/Menu';
import { MenuItem } from '~components/MenuItem';

import s from './NavigationMobile.module.scss';

export function NavigationMobile() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

	const handelIconMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElement(event.currentTarget);
		setIsMenuOpen(true);
	};

	const handelMenuClose = () => {
		setIsMenuOpen(false);
	};

	const linkClass = ({ isActive }: Record<string, boolean>) => (isActive ? asm.joinClasses(s.active, 'link no-underline') : 'link no-underline');

	return (
		<nav className={s.NavigationMobile}>
			<Menu
				isOpen={isMenuOpen}
				onClick={handelMenuClose}
				anchorElement={anchorElement}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom',
				}}
				menuOrigin={{
					horizontal: 'right',
					vertical: 'top',
				}}
			>
				<MenuItem>
					<NavLink className={linkClass} end to={ROUTES.HOME}>
						Головна
					</NavLink>
				</MenuItem>
				<MenuItem>
					<NavLink className={linkClass} to={ROUTES.SONGS_LIST}>
						Список пісень
					</NavLink>
				</MenuItem>
				<MenuItem>
					<NavLink className={linkClass} end to={PRIVATE_ROUTES.CHAT}>
						Чат
					</NavLink>
				</MenuItem>
			</Menu>
			<div>
				<Icon icon="icon--menu" onClick={handelIconMenuClick} />
			</div>
		</nav>
	);
}
