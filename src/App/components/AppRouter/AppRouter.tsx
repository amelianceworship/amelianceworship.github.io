import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '~components/Layout/Layout';
import { StartScreen } from '~components/StartScreen';
import { ROUTES } from '~constants/ROUTES';
import { AboutPage } from '~pages/AboutPage/AboutPage';
import { ChordsListPage } from '~pages/ChordsListPage/ChordsListPage';
import { ErrorPage } from '~pages/ErrorPage/ErrorPage';
import { HomePage } from '~pages/HomePage/HomePage';
import { LogInPage } from '~pages/LogInPage/LogInPage';
import { SignUpPage } from '~pages/SignUpPage/SignUpPage';
import { SongsListPage } from '~pages/SongsListPage/SongsListPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ element: <HomePage />, 			index: true },
			{ element: <LogInPage />, 			path: ROUTES.login },
			{ element: <SignUpPage />, 		path: ROUTES.signup },
			{ element: <SongsListPage />, 	path: ROUTES.songslist },
			{ element: <AboutPage />, 			path: ROUTES.about },
			{ element: <ChordsListPage />,	path: ROUTES.chordslist },
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={router} fallbackElement={<StartScreen />} />;
}
