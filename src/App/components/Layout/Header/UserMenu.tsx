import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { isObjectHasValue } from '~/ameliance-scripts/scripts';
import { ADMIN_ROUTES, PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { userSlice } from '~store/user/userSlice';

import { Avatar } from '~/ameliance-ui/components/Avatar';
import { Icon } from '~/ameliance-ui/components/Icon';
import { LogOutIcon } from '~/ameliance-ui/components/icons/LogOutIcon';
import { ToolIcon } from '~/ameliance-ui/components/icons/ToolIcon';
import { UserIcon } from '~/ameliance-ui/components/icons/UserIcon';
import { LinkLabel } from '~/ameliance-ui/components/Link';
import { Menu, MenuContainer, MenuItem } from '~/ameliance-ui/components/Menu';
import { Typography } from '~/ameliance-ui/components/Typography';

export function UserMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const { isAdmin, isAuth } = useAuth();

	const { user } = useTypedSelector((state) => state.userReducer);
	const {
		photoURL, displayName, email, role,
	} = user;

	const dispatch = useTypedDispatch();
	const { actions } = userSlice;

	const handelIconMenuClick = () => {
		setIsMenuOpen(true);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const handleLogOut = () => {
		dispatch(actions.signOut());
		if (!isObjectHasValue(ROUTES, location.pathname)) navigate(ROUTES.home);
		closeMenu();
	};

	return (
		<MenuContainer>
			<Menu
				isOpen={isMenuOpen}
				onClick={closeMenu}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
				menuOrigin={{ horizontal: 'right', vertical: 'top' }}
				preventItemClickClose
			>
				{isAuth && (
					<NavLink to={PRIVATE_ROUTES.user}>
						<MenuItem onClick={closeMenu}>
							<Icon><UserIcon /></Icon>
							<LinkLabel underline={false}>
								Редагування профілю
							</LinkLabel>
						</MenuItem>
					</NavLink>
				)}
				{isAdmin && (
					<NavLink to={ADMIN_ROUTES.admin}>
						<MenuItem onClick={closeMenu}>
							<Icon><ToolIcon /></Icon>
							<LinkLabel underline={false}>
								Панель адміна
							</LinkLabel>
						</MenuItem>
					</NavLink>
				)}
				<MenuItem onClick={handleLogOut}>
					<Icon><LogOutIcon /></Icon>
					<Typography component="p1">
						Вихід
					</Typography>
				</MenuItem>
			</Menu>
			<Avatar
				src={photoURL}
				alt={displayName}
				char={displayName?.[0] || email?.[0] || ''}
				size="small"
				onClick={handelIconMenuClick}
				title={`${displayName} ${role}`}
			/>
		</MenuContainer>
	);
}
