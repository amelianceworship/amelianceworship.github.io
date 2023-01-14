import { useMediaQuery } from 'react-responsive';

import { SCREEN_SIZES } from '~constants/SCREEN_SIZES';

export function useScreenQuery() {
	const isScreenXX = useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_XX}px)` });
	const isScreenXL = useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_XL}px)` });
	const isScreenLG = useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_LG}px)` });
	const isScreenMD = useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_MD}px)` });
	const isScreenXS = useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_XS}px)` });
	const isScreenSS = useMediaQuery({ query: `(min-width: ${SCREEN_SIZES.SCREEN_SS}px)` });
	return {
		isScreenXX,
		isScreenXL,
		isScreenLG,
		isScreenMD,
		isScreenXS,
		isScreenSS,
	};
}
