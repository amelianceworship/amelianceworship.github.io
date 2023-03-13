import { useMediaQuery } from 'react-responsive';

import { SCREEN_SIZES } from '~constants/SCREEN_SIZES';

export function useScreenQuery() {
	return {
		isScreenXX: useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_XX}px)` }),
		isScreenXL: useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_XL}px)` }),
		isScreenLG: useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_LG}px)` }),
		isScreenMD: useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_MD}px)` }),
		isScreenSM: useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_SM}px)` }),
		isScreenXS: useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_XS}px)` }),
		isScreenSS: useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_SS}px)` }),
	};
}
