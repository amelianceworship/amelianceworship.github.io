import React from 'react';

import asm from 'asm-ts-scripts';

import s from './Icon.module.scss';

interface Params {
	icon: string;
	size?: 'normal' | 'small';
	clickable?: boolean;
	onclick?: (event: React.MouseEvent<HTMLElement>) => void;
	disabled?: boolean;
}

export function Icon({
	icon, size = 'normal', clickable, onclick, disabled,
}: Params) {
	const iconSize = size === 'small' ? 'icon-sm' : 'icon';
	const iconClickable = clickable && 'click';
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<span
			className={asm.joinClasses(s.Icon, icon, iconSize, iconClickable, disabled && s.disabled)}
			onClick={onclick}
		/>
	);
}
