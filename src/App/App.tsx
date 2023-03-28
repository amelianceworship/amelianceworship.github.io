import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from '~components/AppRouter/AppRouter';
import { persistor, store } from '~store/store';

export function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppRouter />
			</PersistGate>
		</Provider>
	);
}
