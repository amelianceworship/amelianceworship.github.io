import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from '~components/AppRouter/AppRouter';
import { persistor, store } from '~store/store';

import { SnackBarProvider } from '~/ameliance-ui/components/snackbar';

export function App() {
	return (
		<Provider store={store}>
			<SnackBarProvider maxSnack={5}>
				<PersistGate loading={null} persistor={persistor}>
					<AppRouter />
				</PersistGate>
			</SnackBarProvider>
		</Provider>
	);
}
