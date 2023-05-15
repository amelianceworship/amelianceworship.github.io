import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { Layout } from '~components/Layout/Layout';
import { ADMIN_ROUTES, PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { AdminPage } from '~pages/AdminPage/AdminPage';
import { ErrorPage } from '~pages/ErrorPage/ErrorPage';
import { HomePage } from '~pages/HomePage/HomePage';
import { LogInPage } from '~pages/LogInPage/LogInPage';
import { SignUpPage } from '~pages/SignUpPage/SignUpPage';
import { SongsListPage } from '~pages/SongsListPage/SongsListPage';
import { UserInfoPage } from '~pages/UserInfoPage/UserInfoPage';
import { UserPage } from '~pages/UserPage/UserPage';
import { UsersPage } from '~pages/UsersPage/UsersPage';

function PrivateRoute({ children }: { children: React.ReactElement }) {
	const { isAuth } = useAuth();
	if (!isAuth) return <Navigate to={ROUTES.login} />;
	return children;
}

function AdminRoute({ children }: { children: React.ReactElement }) {
	const { isAdmin } = useAuth();
	if (!isAdmin) return <Navigate to={ROUTES.home} />;
	return children;
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ element: <HomePage />, index: true },
			{ element: <SongsListPage />, path: `${ROUTES.songslist}` },
			{
				element: <PrivateRoute><UserPage /></PrivateRoute>,
				path: PRIVATE_ROUTES.user,
			},
			{
				element: <PrivateRoute><UsersPage /></PrivateRoute>,
				path: PRIVATE_ROUTES.users,
			},
			{
				element: <AdminRoute><AdminPage /></AdminRoute>,
				path: ADMIN_ROUTES.admin,
			},
		],
	},
	{
		path: '/',
		element: <Layout navigation={false} userMenu={false} />,
		errorElement: <ErrorPage />,
		children: [
			{ element: <LogInPage />, path: ROUTES.login },
			{ element: <SignUpPage />, path: ROUTES.signup },
			{
				element: <PrivateRoute><UserInfoPage /></PrivateRoute>,
				path: `${PRIVATE_ROUTES.userInfo}/:userId`,
			},
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={router} />;
}
