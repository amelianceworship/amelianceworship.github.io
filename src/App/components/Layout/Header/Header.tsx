import { useLocation, useNavigate } from 'react-router-dom';

import { api } from '~api/index';
import { ROUTES } from '~app/constants/ROUTES';
import { Logo } from '~components/Logo';
import { isMatchPath } from '~helpers/isMatchPath';
import { useAuth } from '~hooks/useAuth';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { userSlice } from '~store/user/userSlice';

import { Avatar } from '~/ameliance-ui/components/Avatar';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';
import { useScreenQuery } from '~/ameliance-ui/hooks/useScreenQuery';

import { NavigationDesktop } from './NavigationDesktop/NavigationDesktop';
import { NavigationMobile } from './NavigationMobile/NavigationMobile';
import { Settings } from './Settings';

import s from './Header.module.scss';

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
		navigate(ROUTES.home);
	};

	const handleLogIn = () => {
		navigate(ROUTES.login);
	};

	const isLogIn = isMatchPath(pathname, 'login');
	const isSingUp = isMatchPath(pathname, 'signup');
	const isSongsList = isMatchPath(pathname, 'songslist');

	return (
		<Block component="header" className={s.Header}>
			<Grid container component="section" className={s.container}>
				<Logo />
				<Block className={s.controls}>
					{!isSongsList
				&& (
					<>
						{!isScreenMD && !(isLogIn || isSingUp) && <NavigationDesktop />}
						{isScreenMD && !(isLogIn || isSingUp) && <NavigationMobile />}
						{isAuth
							? !(isLogIn || isSingUp) && <Avatar src={photoURL} alt={displayName} char={displayName[0] || email[0]} size="small" onClick={handleLogOut} />
							: !(isLogIn || isSingUp)
							&& (
								<Button size="small" onClick={handleLogIn}>
									Увійти
								</Button>
							)}
					</>
				)}
					<Settings />
				</Block>
			</Grid>
		</Block>
	);
}
