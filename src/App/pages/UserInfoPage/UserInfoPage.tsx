import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { join, parseCurrentDateFromMs } from '~/ameliance-scripts';
import { SEXES } from '~constants/SEXES';
import { USER_TYPES } from '~constants/USER_TYPES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { getUserInfo } from '~store/userInfo/actions/getUserInfo';
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

	const { isLoading, error, userInfo } = useTypedSelector((state) => state.userInfoReducer);
	const dispatch = useTypedDispatch();
	const { actions } = userInfoSlice;

	useEffect(() => {
		if (userId) dispatch(getUserInfo({ uid: userId }));

		return () => {
			dispatch(actions.removeUserInfo());
			dispatch(actions.resetError());
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	if (error) throw Error(error);

	return (
		<Block component="main" className={s.UserInfoPage}>
			{isLoading ? <LoaderOverlay />
				: (
					<Grid container component="section" className={s.container}>
						<Avatar
							src={userInfo.photoURL || ''}
							alt={userInfo.displayName || ''}
							char={userInfo.displayName?.[0] || userInfo.email?.[0] || ''}
							size="extra"
						/>

						<Block className={s.info}>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h5">Логін</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									<Typography component="p1">{userInfo.displayName}</Typography>
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h5">Роль</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									{userInfo.role && <Typography>{`[${userInfo.role}]`}</Typography>}
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h5">Дата останнього входу</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									<Typography component="p2">
										{parseCurrentDateFromMs(String(userInfo.lastVisitDate))
											.toLocaleDateString()}
										{' '}
										{parseCurrentDateFromMs(String(userInfo.lastVisitDate))
											.toLocaleTimeString()}
									</Typography>
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h5">Дата реєстрації</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									<Typography component="p2">
										{parseCurrentDateFromMs(String(userInfo.registrationDate))
											.toLocaleDateString()}
										{' '}
										{parseCurrentDateFromMs(String(userInfo.registrationDate))
											.toLocaleTimeString()}
									</Typography>
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h5">Стать</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									{userInfo.sex && <Typography component="p2">{SEXES[userInfo.sex]}</Typography>}
								</Block>
							</Grid>

							<Grid row className={s.row}>
								<Block grid={{ xx: 6 }} className={join(s.headingColumn, s.column)}>
									<Typography component="h5">Статус</Typography>
								</Block>
								<Block grid={{ xx: 6 }} className={join(s.infoColumn, s.column)}>
									{userInfo.userType && <Typography component="p2">{USER_TYPES[userInfo.userType]}</Typography>}
								</Block>
							</Grid>

						</Block>

						<Icon onClick={handleBackwardIconOnClick}><ArrowLeftIcon /></Icon>
					</Grid>
				)}
		</Block>
	);
}
