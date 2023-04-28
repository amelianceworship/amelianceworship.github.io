import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { parseCurrentDateFromMs } from 'asm-ts-scripts';

import { join, sortArrayOfObj } from '~/ameliance-scripts';
import { PRIVATE_ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { getAllUsers } from '~store/users/actions/getAllUsers';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Avatar } from '~/ameliance-ui/components/Avatar';
import { Block } from '~/ameliance-ui/components/blocks';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './UsersPage.module.scss';

export function UsersPage() {
	const navigate = useNavigate();

	const { user } = useTypedSelector((state) => state.userReducer);
	const { uid } = user;
	const { isLoading, users } = useTypedSelector((state) => state.usersReducer);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(getAllUsers());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUserOnClick = (userId: string) => {
		navigate(`${PRIVATE_ROUTES.userInfo}/${userId}`);
	};

	return (
		<Block component="main" className={s.UsersPage}>
			<Grid container component="section" className={s.container}>
				<Typography component="h4">Список користувачів</Typography>
				<Grid className={s.listContainer}>
					<Grid
						row
						className={s.row}
					>
						<Block grid={{ xx: 7, xl: 9, md: 9 }}>
							<Typography component="h5">
								Користувач
							</Typography>
						</Block>
						<Block grid={{ xx: 2, md: 3 }}>
							<Typography component="h5" className={s.ellipsis}>
								Відвідувань
							</Typography>
						</Block>
					</Grid>
					{users.length > 0 && sortArrayOfObj(users, 'visitsCount').reverse().map((userItem) => (
						<Grid
							row
							key={userItem.uid}
							className={join(s.row, s.user, userItem.uid === uid ? s.current : null)}
							onClick={() => handleUserOnClick(userItem.uid)}
						>
							<Block grid={{ xx: 1, md: 2 }}>
								<Avatar
									src={userItem.photoURL || ''}
									alt={userItem.displayName || ''}
									char={userItem.displayName?.[0] || userItem.email?.[0] || ''}
									size="small"
								/>
							</Block>
							<Block grid={{ xx: 6, xl: 8, md: 7 }} className={s.userName}>
								<Typography component="p1" className={s.ellipsis}>
									{userItem.displayName}
								</Typography>
								{userItem.role && (
									<Typography component="caption" className={s.ellipsis}>
										{`[${userItem.role}]`}
									</Typography>
								)}
							</Block>
							<Block grid={{ xx: 2, md: 3 }} className={s.userStats}>
								<Typography component="p1">
									{userItem.visitsCount}
								</Typography>
								{userItem.lastVisitDate && (
									<Block className={s.time}>
										<Typography component="caption">
											{parseCurrentDateFromMs(userItem.lastVisitDate)
												.toLocaleDateString()}
										</Typography>
										<Typography component="caption">
											{parseCurrentDateFromMs(userItem.lastVisitDate)
												.toLocaleTimeString()}
										</Typography>
									</Block>
								)}
							</Block>
						</Grid>
					))}
				</Grid>
			</Grid>
			{isLoading && <LoaderOverlay />}
		</Block>
	);
}
