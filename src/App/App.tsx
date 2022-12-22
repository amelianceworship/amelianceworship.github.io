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

import { Main } from './pages/Main';
import { initLocalStorage } from './utils/initLocalStorage';

export function App() {
	initLocalStorage();

	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="about" element={<About />} />
					<Route path="chordslist" element={<ChordsList />} />
					<Route path="login" element={<LogIn />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="chat" element={<Chat />} />
					<Route path="other" element={<NotFound />} />
					<Route path="songslist" element={<SongsList />} />
				</Route>
			</Routes>
		</Provider>
	);
}
