import {
	Link, NavLink, useLocation, useNavigate,
} from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { PRIVATE_ROUTES, ROUTES } from '~app/constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { userSlice } from '~store/user/userSlice';

import s from './Header.module.scss';

export function Header() {

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { isAuth } = useAuth();

	const dispatch = useTypedDispatch();
	const { removeUser } = userSlice.actions;

	const handleLogOut = () => {
		dispatch(removeUser());
		navigate(ROUTES.home);
	};

	const handleLogIn = () => {
		navigate(ROUTES.logIn);
	};

	const linkClass = ({ isActive }: Record<string, boolean>) => (isActive ? asm.joinClasses(s.active, 'link') : 'link');

	return (
		<header className="header">
			<section className={asm.joinClasses(s.container, 'container')}>
				<Link className={asm.joinClasses(s.logo, 'h4')} to="/">
					AW
					{isAuth && <span className="h5">orship</span>}
				</Link>
				{(isAuth || !(pathname === '/songslist' || pathname === '/songslist/'))
					? (
						<nav className={asm.joinClasses(s.navigation)}>
							<NavLink className={linkClass} end to={PRIVATE_ROUTES.chat}>
								Чат
							</NavLink>
							<NavLink className={linkClass} end to={ROUTES.home}>
								Головна
							</NavLink>
							<NavLink className={linkClass} to={ROUTES.songsList}>
								Список пісень
							</NavLink>
							{isAuth
								? (
									<button type="button" className="button secondary" onClick={handleLogOut}>
										Вийти
									</button>
								)
								: (
									<button type="button" className="button primary" onClick={handleLogIn}>
										Увійти
									</button>
								)}
						</nav>
					) : null}
			</section>
		</header>
	);
}
