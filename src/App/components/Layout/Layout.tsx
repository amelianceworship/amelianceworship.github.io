import { Outlet } from 'react-router-dom';

export function Layout() {

	return (
		<>
			<header className="header" />
			<Outlet />
			<footer className="footer" />
		</>
	);
}
