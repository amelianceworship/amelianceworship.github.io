import {
	matchPath, useLocation, useNavigate,
} from 'react-router-dom';

import { ROUTES } from '~app/constants/ROUTES';
import { Logo } from '~components/Logo';
import { useAuth } from '~hooks/useAuth';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';

import { HeaderMenu } from './HeaderMenu';
import { Navigation } from './Navigation/Navigation';
import { UserMenu } from './UserMenu';

import s from './Header.module.scss';

export function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { isAuth } = useAuth();

	const handleLogIn = () => {
		navigate(ROUTES.login);
	};

	const isLogIn = matchPath('/login', pathname);
	const isSingUp = matchPath('/signup', pathname);

	return (
		<Block component="header" className={s.Header}>
			<Grid container component="section" className={s.container}>
				<Logo />
				<Block className={s.controls}>
					{!(isLogIn || isSingUp) && <Navigation />}
					<HeaderMenu />
					{isAuth
						? !(isLogIn || isSingUp) && <UserMenu />
						: !(isLogIn || isSingUp)
							&& (
								<Button size="small" onClick={handleLogIn}>
									Увійти
								</Button>
							)}
				</Block>
			</Grid>
		</Block>
	);
}
