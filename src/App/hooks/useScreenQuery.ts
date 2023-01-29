import { useMediaQuery } from 'react-responsive';

import { SCREEN_SIZES } from '~constants/SCREEN_SIZES';

export function useScreenQuery() {
	return {
		isScreenXX: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.SCREEN_XX}px)` }),
		isScreenXL: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.SCREEN_XL}px)` }),
		isScreenLG: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.SCREEN_LG}px)` }),
		isScreenMD: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.SCREEN_MD}px)` }),
		isScreenXS: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.SCREEN_XS}px)` }),
		isScreenSS: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.SCREEN_SS}px)` }),
	};
}
