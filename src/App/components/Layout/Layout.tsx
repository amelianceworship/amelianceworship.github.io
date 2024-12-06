import { Outlet } from 'react-router-dom';

import { Snow } from '~components/Show/Snow';
import { StartScreen } from '~components/StartScreen/StartScreen';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { useAppInit } from './hooks/useAppInit';

interface Layout {
	header?: boolean;
	navigation?: boolean;
	headerMenu?: boolean;
	userMenu?: boolean;
	footer?: boolean;
}

export function Layout({
	header = true,
	navigation = true,
	headerMenu = true,
	userMenu = true,
	footer = true,
}: Layout) {
	const { isInit } = useAppInit();

	if (!isInit) return <StartScreen />;

	return (
		<>
			{header && (
				<Header
					navigation={navigation}
					headerMenu={headerMenu}
					userMenu={userMenu}
				/>
			)}
			<Outlet />
			{footer && <Footer />}
			<Snow />
		</>
	);
}
