import { useState } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '~components/Layout';
import { Snow } from '~components/Snow';
import { StartScreen } from '~components/StartScreen';
import { ROUTES } from '~constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { About } from '~pages/About';
import { ChordsList } from '~pages/ChordsList';
import { LogIn } from '~pages/LogIn';
import { NotFound } from '~pages/NotFound';
import { SignUp } from '~pages/SignUp';
import { SongsList } from '~pages/SongsList';
import { store } from '~store/store';

import { AppInit } from './AppInit';
import { Home } from './pages/Home';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
	const { isAuth } = useAuth();
	if (!isAuth) return <Navigate to={ROUTES.LOGIN} />;
	return children;
}

export function App() {
	const [isInit, setIsInit] = useState(true);

	return (
		<Provider store={store}>
			<AppInit onIsInitChange={setIsInit}>
				{isInit ? <StartScreen />
					: (
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route index element={<Home />} />
								<Route path="login" element={(<LogIn />)} />
								<Route path="signup" element={(<SignUp />)} />
								<Route path="songslist" element={<SongsList />} />
								<Route path="about" element={<About />} />
								<Route path="chordslist" element={<ChordsList />} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					)}
			</AppInit>
			<Snow />
		</Provider>
	);
}
