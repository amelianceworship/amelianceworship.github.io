import { useLocation } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { PRIVATE_ROUTES } from '~constants/ROUTES';
import { isMatchPath } from '~helpers/isMatchPath';
import { useAuth } from '~hooks/useAuth';

import s from './Footer.module.scss';

export function Footer() {
	const { pathname } = useLocation();
	const { isAuth } = useAuth();

	const isLogIn = isMatchPath(pathname, 'login');
	const isSingUp = isMatchPath(pathname, 'signup');

	return (
		<footer>
			<section className={asm.joinClasses(s.container, 'container')}>
				{!(isLogIn || isSingUp) && (isAuth && pathname !== PRIVATE_ROUTES.CHAT)
					&& (
						<a href="/" target="_blank" className="link">
							2023 01 19
						</a>
					)}
			</section>
		</footer>
	);
}
