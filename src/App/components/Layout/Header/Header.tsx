import { useNavigate } from 'react-router-dom';

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

interface Header {
	navigation?: boolean;
	headerMenu?: boolean;
	userMenu?: boolean;
}

export function Header({
	navigation = true,
	headerMenu = true,
	userMenu = true,
}: Header) {
	const navigate = useNavigate();

	const { isAuth } = useAuth();

	const handleLogIn = () => {
		navigate(ROUTES.login);
	};

	return (
		<Block component="header" className={s.Header}>
			<Grid container component="section" className={s.container}>
				<Logo />
				<Block className={s.controls}>
					{navigation && <Navigation />}
					{headerMenu && <HeaderMenu />}
					{userMenu
						&& (isAuth
							? <UserMenu />
							: (
								<Button size="small" onClick={handleLogIn}>
									Увійти
								</Button>
							))}
				</Block>
			</Grid>
		</Block>
	);
}
