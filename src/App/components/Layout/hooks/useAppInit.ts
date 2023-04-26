import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';
import { useViewportHeight } from '~hooks/useViewportHeight';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { getAuthUserId } from '~store/user/actions/getAuthUserId';
import { initUserOnPageLoad } from '~store/user/actions/initUserOnPageLoad';

import { useInitTheme } from '~/ameliance-ui/hooks/useInitTheme';

export function useAppInit() {
	const [isInit, setIsInit] = useState(false);

	useViewportHeight();

	const { theme } = useTypedSelector((state) => state.appReducer);
	const { user, authUserId } = useTypedSelector((state) => state.userReducer);
	const { uid } = user;

	// *----- set or init theme -----
	useInitTheme(theme);

	const dispatch = useTypedDispatch();

	const navigate = useNavigate();
	const location = useLocation();
	const [startLocation, setStartLocation] = useState<string | null>(null);

	useLayoutEffect(() => {
		document.body.classList.add('scroll');
		dispatch(getAuthUserId());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// *----- set path init browser path -----
	useLayoutEffect(() => {
		const locationToNavigate = location.pathname === ROUTES.login
			|| location.pathname === ROUTES.signup ? PRIVATE_ROUTES.users : location.pathname;
		setStartLocation(locationToNavigate || ROUTES.home);
	}, [location]);

	useLayoutEffect(() => {
		if (authUserId) dispatch(initUserOnPageLoad({ uid: authUserId }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUserId]);

	useEffect(() => {
		if (uid || uid === null) {
			if (startLocation) navigate(startLocation);
			setIsInit(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid]);

	return { isInit };
}
