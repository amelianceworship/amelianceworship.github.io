import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '~api/google/firebase/firebase';
import { useViewportHeight } from '~hooks/useViewportHeight';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { userSlice } from '~store/user/userSlice';

import { useInitTheme } from '~/asmlib/hooks/useInitTheme';

interface AppInit {
	children: React.ReactElement;
	onIsInitChange: (arg: boolean) => void;
}

export function AppInit({ children, onIsInitChange }: AppInit) {
	useViewportHeight();

	// *----- set or init theme -----
	const initTheme = useInitTheme('light');

	const dispatch = useTypedDispatch();
	const { actions } = userSlice;

	const navigate = useNavigate();
	const location = useLocation();

	const [startLocation] = useState(location);
	// initLocalStorage();

	useLayoutEffect(() => {
		document.body.classList.add('scroll');
	}, []);

	useEffect(() => {
		const initFetch = async () => {
			let init = true;
			onAuthStateChanged(auth, (user) => {
				if (user) {
					dispatch(actions.setUser({
						displayName: user.displayName?.toString(),
						email: user.email?.toString(),
						photoURL: user.photoURL?.toString(),
						uid: user.uid?.toString(),
					}));
				}
				if (init) {
					navigate(startLocation);
					onIsInitChange(false);
					init = false;
				}
			});
		};
		initFetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return children;
}
