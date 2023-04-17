import {
	matchPath, useLocation, useNavigate,
} from 'react-router-dom';

import { api } from '~api/index';
import { ROUTES } from '~app/constants/ROUTES';
import { Logo } from '~components/Logo';
import { useAuth } from '~hooks/useAuth';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { userSlice } from '~store/user/userSlice';

import { Avatar } from '~/ameliance-ui/components/Avatar';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';

import { Navigation } from './Navigation/Navigation';
import { Settings } from './Settings';

import s from './Header.module.scss';

export function Header() {
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

	const isLogIn = matchPath('/login', pathname);
	const isSingUp = matchPath('/signup', pathname);
	const isSongsList = matchPath('/songslist', pathname) || matchPath('/songslist/:page', pathname);

	return (
		<Block component="header" className={s.Header}>
			<Grid container component="section" className={s.container}>
				<Logo />
				<Block className={s.controls}>
					{!isSongsList
				&& (
					<>
						{!(isLogIn || isSingUp) && <Navigation />}
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
