import { useEffect, useLayoutEffect, useState } from 'react';
import type { Location } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '~api/google/firebase/firebase';
import { ROUTES } from '~constants/ROUTES';
import { useViewportHeight } from '~hooks/useViewportHeight';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { userSlice } from '~store/user/userSlice';

import { useInitTheme } from '~/ameliance-ui/hooks/useInitTheme';

export function useAppInit() {
	const [isInit, setIsInit] = useState(false);

	useViewportHeight();

	const { theme } = useTypedSelector((state) => state.appReducer);
	console.log('theme: ', theme);
	// *----- set or init theme -----
	// const initTheme = useInitTheme('light');
	useInitTheme(theme);

	const dispatch = useTypedDispatch();
	const { actions } = userSlice;

	const navigate = useNavigate();
	const location = useLocation();
	console.log('location: ', location);
	const [startLocation, setStartLocation] = useState('');

	// initLocalStorage();

	useLayoutEffect(() => {
		document.body.classList.add('scroll');
	}, []);

	useLayoutEffect(() => {
		setStartLocation(location.pathname);
	}, [location]);

	useEffect(() => {
		const initFetch = async () => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					dispatch(actions.setUser({
						displayName: user.displayName?.toString(),
						email: user.email?.toString(),
						photoURL: user.photoURL?.toString(),
						uid: user.uid?.toString(),
					}));
				}
				if (!isInit) {
					if (startLocation) navigate(startLocation);
					setIsInit(true);
				}
			});
		};
		initFetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { isInit };
}
