import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '~components/Layout';
import { Snow } from '~components/Snow';
import { About } from '~pages/About';
import { ChatPage } from '~pages/ChatPage';
import { ChordsList } from '~pages/ChordsList';
import { LogIn } from '~pages/LogIn';
import { NotFound } from '~pages/NotFound';
import { SignUp } from '~pages/SignUp';
import { SongsList } from '~pages/SongsList';
import { store } from '~store/store';
import { sendAnalyticsData } from '~utils/analytics/sendAnalyticsData';

import { Home } from './pages/Home';
import { initLocalStorage } from './utils/initLocalStorage';

export function App() {
	initLocalStorage();

	useEffect(() => {
		const fetchAnalytics = async () => {
			await sendAnalyticsData();
		};
		fetchAnalytics();
	}, []);

	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<LogIn />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="songslist" element={<SongsList />} />
					<Route path="chat" element={<ChatPage />} />
					<Route path="about" element={<About />} />
					<Route path="chordslist" element={<ChordsList />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			<Snow />
		</Provider>
	);
}
