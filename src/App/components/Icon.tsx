import asm from 'asm-ts-scripts';

import s from './Icon.module.scss';

interface Params {
	icon: string;
	size?: 'normal' | 'small';
	isClickable?: boolean;
	onclick?: () => void;
}

export function Icon({
	icon, size = 'normal', isClickable, onclick,
}: Params) {
	const iconSize = size === 'small' ? 'icon-sm' : 'icon';
	const iconClickable = isClickable ? 'click' : '';
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<span className={asm.joinClasses(s.Icon, icon, iconSize, iconClickable)} onClick={onclick} />
	);
}
