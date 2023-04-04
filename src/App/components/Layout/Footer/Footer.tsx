import { NavLink, useLocation } from 'react-router-dom';

import { APP } from '~constants/APP';
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
	const isSongsList = isMatchPath(pathname, 'songslist');

	if	(isSongsList) return null;

	return (
		<Block component="footer" className={s.Footer}>
			<Grid container className={s.container}>
				{!(isLogIn || isSingUp) && (isAuth && pathname !== PRIVATE_ROUTES.chat)
					&& (
						<NavLink to={ROUTES.home}>
							<LinkLabel display="caption">
								{`${APP.name} ${APP.version}`}
							</LinkLabel>
						</NavLink>
					)}
			</Grid>
		</Block>
	);
}
