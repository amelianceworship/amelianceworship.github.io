import { NavLink, useLocation } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';
import { isMatchPath } from '~helpers/isMatchPath';
import { useAuth } from '~hooks/useAuth';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { LinkLabel } from '~/ameliance-ui/components/Link/LinkLabel';

import s from './Footer.module.scss';

export function Footer() {
	const { pathname } = useLocation();
	const { isAuth } = useAuth();

	const isLogIn = isMatchPath(pathname, 'login');
	const isSingUp = isMatchPath(pathname, 'signup');

	return (
		<Block component="footer">
			<Grid container className={asm.join(s.container)}>
				{!(isLogIn || isSingUp) && (isAuth && pathname !== PRIVATE_ROUTES.CHAT)
					&& (
						<NavLink to={ROUTES.HOME}>
							<LinkLabel>
								2023 03 12
							</LinkLabel>
						</NavLink>
					)}
			</Grid>
		</Block>
	);
}
