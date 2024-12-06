import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { parseCurrentDateFromMs } from 'asm-ts-scripts';
import type { Unsubscribe } from 'firebase/firestore';
import { collection, onSnapshot, query } from 'firebase/firestore';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { join, sortArrayOfObj } from '~/ameliance-scripts';
import { db } from '~api/google/firebase/firebase';
import { PRIVATE_ROUTES } from '~constants/ROUTES';
import { returnError } from '~helpers/returnError';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { usersSlice } from '~store/users/usersSlice';
import type { UserResponse } from '~types/api/google/firebase/commons/UserResponse';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Avatar } from '~/ameliance-ui/components/Avatar';
import { Block } from '~/ameliance-ui/components/blocks';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './UsersPage.module.scss';

const MotionGrid = motion(Grid);

const variants: Variants = {
	enter: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

export function UsersPage() {
	const navigate = useNavigate();

	const { user } = useTypedSelector((state) => state.userReducer);
	const { uid } = user;
	const { usersRealtime } = useTypedSelector((state) => state.usersReducer);
	const dispatch = useTypedDispatch();
	const { actions } = usersSlice;

	useEffect(() => {
		const usersRef = collection(db, 'users');
		const usersQuery = query(usersRef);

		let unsubscribe: Unsubscribe;
		try {
			unsubscribe = onSnapshot(usersQuery, (querySnapshot) => {
				const users: UserResponse[] = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					users.push({ uid: data.uid, ...data.user });
				});
				if (users.length > 0) {
					dispatch(actions.setUsersRealtime(users));
				} else {
					throw new Error('Can\'t find any users!');
				}
			});
		} catch (error) {
			throw new Error(returnError(error));
		}

		return () => unsubscribe();
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
					{usersRealtime.length > 0 && sortArrayOfObj(usersRealtime, 'visitsCount').reverse().map((userItem, i) => (
						<MotionGrid
							row
							key={userItem.uid}
							className={join(s.row, s.user, userItem.uid === uid ? s.current : null)}
							onClick={() => handleUserOnClick(userItem.uid)}
							variants={variants}
							initial="enter"
							animate="visible"
							transition={{ delay: 0.05 * i }}
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
						</MotionGrid>
					))}
				</Grid>
			</Grid>
			{usersRealtime === null && <LoaderOverlay />}
		</Block>
	);
}
