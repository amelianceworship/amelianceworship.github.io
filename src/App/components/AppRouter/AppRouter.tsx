import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { Layout } from '~components/Layout/Layout';
import { PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { AdminPage } from '~pages/AdminPage/AdminPage';
import { ErrorPage } from '~pages/ErrorPage/ErrorPage';
import { HomePage } from '~pages/HomePage/HomePage';
import { LogInPage } from '~pages/LogInPage/LogInPage';
import { SignUpPage } from '~pages/SignUpPage/SignUpPage';
import { SongsListPage } from '~pages/SongsListPage/SongsListPage';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
	const { isAuth } = useAuth();
	if (!isAuth) return <Navigate to={ROUTES.login} />;
	return children;
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ element: <HomePage />, 			index: true },
			{ element: <LogInPage />, 			path: ROUTES.login },
			{ element: <SignUpPage />, 		path: ROUTES.signup },
			{ element: <SongsListPage />, 	path: `${ROUTES.songslist}` },
			{ element: <SongsListPage />, 	path: `${ROUTES.songslist}/:page` },
			{
				element: <ProtectedRoute><AdminPage /></ProtectedRoute>,
				path: PRIVATE_ROUTES.admin,
			},
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={router} />;
}
