import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Unsubscribe } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';

import {
	isObjectEmpty, join, parseCurrentDateFromMs,
} from '~/ameliance-scripts';
import { db } from '~api/google/firebase/firebase';
import { SEXES } from '~constants/SEXES';
import { USER_TYPES } from '~constants/USER_TYPES';
import { returnError } from '~helpers/returnError';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { userInfoSlice } from '~store/userInfo/userInfoSlice';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Avatar } from '~/ameliance-ui/components/Avatar';
import { Block } from '~/ameliance-ui/components/blocks';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Icon } from '~/ameliance-ui/components/Icon';
import { ArrowLeftIcon } from '~/ameliance-ui/components/icons/ArrowLeftIcon';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './UserInfoPage.module.scss';

export function UserInfoPage() {
	const { userId } = useParams();
	const navigate = useNavigate();

	const handleBackwardIconOnClick = () => {
		navigate(-1);
	};

	const { userInfoRealtime } = useTypedSelector((state) => state.userInfoReducer);
	const dispatch = useTypedDispatch();
	const { actions } = userInfoSlice;

	useEffect(() => {
		const userRef = doc(db, 'users', userId || '');
		let unsubscribe: Unsubscribe;
		try {
			unsubscribe = onSnapshot(userRef, (docSnap) => {
				const data = docSnap.data();
				if (data && !isObjectEmpty(data)) {
					dispatch(actions.setUsersRealtime({ uid: data.uid, ...data.user }));
				} else {
					throw new Error('Can\'t find user!');
				}
			});
		} catch (error) {
			throw new Error(returnError(error));
		}

		return () => unsubscribe();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Block component="main" className={s.UserInfoPage}>
			{!userInfoRealtime ? <LoaderOverlay />
				: (
					<Grid container component="section" className={s.container}>
						<Avatar
							src={userInfoRealtime.photoURL || ''}
							alt={userInfoRealtime.displayName || ''}
							char={userInfoRealtime.displayName?.[0] || userInfoRealtime.email?.[0] || ''}
							size="extra"
						/>

						<Block className={s.info}>

							<Typography component="h5" className={s.userInfoRealtime}>{userInfoRealtime.displayName}</Typography>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h6">Роль</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									{userInfoRealtime.role && <Typography component="p2">{`[${userInfoRealtime.role}]`}</Typography>}
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h6">Кількість відвідувань</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									<Typography component="p2">
										{userInfoRealtime.visitsCount}
									</Typography>
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h6">Останній вхід</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									<Typography component="p2">
										{parseCurrentDateFromMs(String(userInfoRealtime.lastVisitDate))
											.toLocaleDateString()}
										{' '}
										{parseCurrentDateFromMs(String(userInfoRealtime.lastVisitDate))
											.toLocaleTimeString()}
									</Typography>
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h6">Дата реєстрації</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									<Typography component="p2">
										{parseCurrentDateFromMs(String(userInfoRealtime.registrationDate))
											.toLocaleDateString()}
										{' '}
										{parseCurrentDateFromMs(String(userInfoRealtime.registrationDate))
											.toLocaleTimeString()}
									</Typography>
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h6">Стать</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									{userInfoRealtime.sex && <Typography component="p2">{SEXES[userInfoRealtime.sex]}</Typography>}
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h6">Тип</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									{userInfoRealtime.userType && <Typography component="p2">{USER_TYPES[userInfoRealtime.userType]}</Typography>}
								</Block>
							</Grid>

						</Block>

						<Icon onClick={handleBackwardIconOnClick}><ArrowLeftIcon /></Icon>
					</Grid>
				)}
		</Block>
	);
}
