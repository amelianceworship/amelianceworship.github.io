import { NavLink } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { PRIVATE_ROUTES, ROUTES } from '~app/constants/ROUTES';

import { Nav } from '~/ameliance-ui/components/blocks/Nav';

import s from './NavigationDesktop.module.scss';

export function NavigationDesktop() {
	const linkClass = ({ isActive }: Record<string, boolean>) => (isActive ? asm.join(s.active, 'link no-underline') : 'link no-underline');

	return (
		<Nav className={s.NavigationDesktop}>
			<NavLink className={linkClass} end to={ROUTES.HOME}>
				Головна
			</NavLink>
			<NavLink className={linkClass} to={ROUTES.SONGS_LIST}>
				Список пісень
			</NavLink>
			<NavLink className={linkClass} end to={PRIVATE_ROUTES.CHAT}>
				Чат
			</NavLink>
		</Nav>
	);
}
