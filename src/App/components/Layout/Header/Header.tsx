import { useLocation, useNavigate } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { api } from '~api/index';
import { ROUTES } from '~app/constants/ROUTES';
import { Avatar } from '~components/Avatar';
import { Button } from '~components/inputs/Button';
import { Logo } from '~components/Logo';
import { isMatchPath } from '~helpers/isMatchPath';
import { useAuth } from '~hooks/useAuth';
import { useScreenQuery } from '~hooks/useScreenQuery';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { userSlice } from '~store/user/userSlice';

import s from './Header.module.scss';
import { NavigationDesktop } from './NavigationDesktop';
import { NavigationMobile } from './NavigationMobile';

export function Header() {
	const { isScreenMD } = useScreenQuery();
	const dispatch = useTypedDispatch();
	const { photoURL, displayName, email } = useTypedSelector((state) => state.userReducer);

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { isAuth } = useAuth();
	const { removeUser } = userSlice.actions;

	const handleLogOut = () => {
		dispatch(removeUser());
		api.google.firebase.auth.signOut();
		navigate(ROUTES.HOME);
	};

	const handleLogIn = () => {
		navigate(ROUTES.LOGIN);
	};

	const isLogIn = isMatchPath(pathname, 'login');
	const isSingUp = isMatchPath(pathname, 'signup');

	return (
		<header>
			<section className={asm.joinClasses(s.container, 'container')}>
				<Logo />
				<div className={asm.joinClasses(s.controls, 'disabled')}>
					{!isScreenMD && !(isLogIn || isSingUp) && <NavigationDesktop />}
					{isScreenMD && !(isLogIn || isSingUp) && <NavigationMobile />}
					{isAuth
						? !(isLogIn || isSingUp) && <Avatar src={photoURL} alt={displayName} char={displayName[0] || email[0]} size="small" onClick={handleLogOut} isClickable />
						: !(isLogIn || isSingUp)
							&& (
								<Button onClick={handleLogIn}>
									Увійти
								</Button>
							)}
				</div>
			</section>
		</header>
	);
}
