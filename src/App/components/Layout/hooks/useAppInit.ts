import {
	useEffect, useLayoutEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useViewportHeight } from '~hooks/useViewportHeight';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { getAuthUserId } from '~store/user/actions/getAuthUserId';
import { initUserOnPageLoad } from '~store/user/actions/initUserOnPageLoad';
import { userSlice } from '~store/user/userSlice';

import { useInitTheme } from '~/ameliance-ui/hooks/useInitTheme';

export function useAppInit() {
	const [isInit, setIsInit] = useState(false);

	useViewportHeight();

	const { theme } = useTypedSelector((state) => state.appReducer);
	const { error, user, authUserId } = useTypedSelector((state) => state.userReducer);
	const { uid } = user;

	//* set or init theme
	useInitTheme(theme);

	const dispatch = useTypedDispatch();
	const { actions } = userSlice;

	const navigate = useNavigate();
	const location = useLocation();
	const [startLocation] = useState(location.pathname);

	useLayoutEffect(() => {
		document.body.classList.add('scroll');
		//* get userId from auth data saved in browser and set it to user store
		dispatch(getAuthUserId());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		//* fetch user data if user auth saved in browser
		if (!isInit && authUserId) dispatch(initUserOnPageLoad({ uid: authUserId }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUserId]);

	useEffect(() => {
		//*
		if (!isInit && (uid || authUserId === null || error)) {
			if (error) dispatch(actions.signOut());
			setIsInit(true);
			navigate(startLocation);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid, authUserId, error]);

	return { isInit };
}
