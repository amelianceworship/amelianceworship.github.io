import { NavLink } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { PRIVATE_ROUTES, ROUTES } from '~app/constants/ROUTES';

import { Nav } from '~/ameliance-ui/components/blocks/Nav';
import { LinkLabel } from '~/ameliance-ui/components/Link';

import s from './NavigationDesktop.module.scss';

export function NavigationDesktop() {
	const linkClass = ({ isActive }: Record<string, boolean>) => (isActive ? s.active : '');

	return (
		<Nav className={s.NavigationDesktop}>
			<NavLink className={linkClass} end to={ROUTES.home}>
				<LinkLabel className={s.link} underline={false}>
					Головна
				</LinkLabel>
			</NavLink>
			<NavLink className={linkClass} to={ROUTES.songslist}>
				<LinkLabel className={s.link} underline={false}>
					Список пісень
				</LinkLabel>
			</NavLink>
			<NavLink className={linkClass} end to={PRIVATE_ROUTES.chat}>
				<LinkLabel className={s.link} underline={false}>
					Чат
				</LinkLabel>
			</NavLink>
		</Nav>
	);
}
