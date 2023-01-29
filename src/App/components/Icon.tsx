import React from 'react';

import asm from 'asm-ts-scripts';

import s from './Icon.module.scss';

interface Params {
	icon: string;
	size?: 'normal' | 'small';
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	disabled?: boolean;
	className?: string;
}

export function Icon({
	icon, size = 'normal', onClick, disabled, className,
}: Params) {
	const iconSize = size === 'small' ? 'icon-sm' : 'icon';
	const iconClickable = onClick && 'clickable';
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<span
			className={asm.joinClasses(
				className,
				s.Icon,
				icon,
				iconSize,
				iconClickable,
				disabled && s.disabled,
			)}
			onClick={onClick}
		/>
	);
}
