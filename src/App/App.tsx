import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '~components/Layout';
import { About } from '~pages/About';
import { Chat } from '~pages/Chat';
import { ChordsList } from '~pages/ChordsList';
import { LogIn } from '~pages/LogIn';
import { NotFound } from '~pages/NotFound';
import { SignUp } from '~pages/SignUp';
import { SongsList } from '~pages/SongsList';
import { store } from '~store/store';

import { ROUTES } from './constants/ROUTES';
import { Main } from './pages/Main';
import { initLocalStorage } from './utils/initLocalStorage';

import '~api/google/firebase/firebaseConfig';

export function App() {
	initLocalStorage();

	return (
		<Provider store={store}>
			<Routes>
				<Route element={<Layout />}>
					<Route path={ROUTES.main} index element={<Main />} />
					<Route path={ROUTES.about} element={<About />} />
					<Route path={ROUTES.songslist} element={<SongsList />} />
					<Route path={ROUTES.chordlist} element={<ChordsList />} />
					<Route path={ROUTES.login} element={<LogIn />} />
					<Route path={ROUTES.signup} element={<SignUp />} />
					<Route path={ROUTES.chat} element={<Chat />} />
					<Route path={ROUTES.other} element={<NotFound />} />
				</Route>
			</Routes>
		</Provider>
	);
}
