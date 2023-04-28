import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

import type { store } from '~store/store';

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
