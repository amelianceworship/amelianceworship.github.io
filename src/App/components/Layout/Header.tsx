import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '~app/constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { userSlice } from '~store/user/userSlice';

import './Header.scss';

export function Header() {

	const { pathname } = useLocation();

	const { isAuth } = useAuth();
	const navigate = useNavigate();

	const dispatch = useTypedDispatch();
	const { removeUser } = userSlice.actions;

	const handleLogOut = () => {
		dispatch(removeUser());
		navigate(ROUTES.home);
	};

	if (pathname === '/songslist' || pathname === '/songslist/') return (<header className="header" />);

	return (
		<header className="header">
			<section className="container">
				<h3 className="h3">
					AW
				</h3>
				<nav className="navigation">
					<NavLink className="p1" end to={ROUTES.main}>
						Головна
					</NavLink>
					<NavLink className="p1" to={ROUTES.songsList}>
						Список пісень
					</NavLink>
					{isAuth
						? (
							<button type="button" className="p1" onClick={handleLogOut}>
								Вийти
							</button>
						)
						: (
							<NavLink className="p1" to={ROUTES.logIn}>
								Увійти
							</NavLink>
						)}

				</nav>
			</section>
		</header>
	);
}

// {isAuth
// 	? (
// 		<>
// 			<button type="button" className="p1" onClick={handleLogOut}>
// 				Вийти
// 			</button>
// 			<NavLink className="p1" to={`/${ROUTES.logIn}`}>
// 				Вхід
// 			</NavLink>
// 		</>
// 	)
// 	: null}
