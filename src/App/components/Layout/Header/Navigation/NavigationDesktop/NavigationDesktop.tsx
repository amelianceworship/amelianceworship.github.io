import { NavLink } from 'react-router-dom';

import { Nav } from '~/ameliance-ui/components/blocks/Nav';
import { LinkLabel } from '~/ameliance-ui/components/Link';

import { navigationList } from '../navigationList';

import s from './NavigationDesktop.module.scss';

export function NavigationDesktop() {
	const linkClass = ({ isActive }: Record<string, boolean>) => (isActive ? s.active : '');

	return (
		<Nav className={s.NavigationDesktop}>
			{navigationList.map((item) => (
				<NavLink key={item.label} className={linkClass} end={item.end} to={item.path}>
					<LinkLabel className={s.link} underline={false}>
						{item.label}
					</LinkLabel>
				</NavLink>
			))}
		</Nav>
	);
}
