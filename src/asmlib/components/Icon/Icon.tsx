import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './Icon.module.scss';

type ComponentElementType = HTMLDivElement;

interface Icon extends ReactHTMLElementAttributes<ComponentElementType> {
	size?: ComponentSizes;
	height?: string | number;
	width?: string | number;
}

export const Icon = forwardRef<ComponentElementType, Icon>(({
	size = 'default',
	width = 24,
	height = 24,
	onClick,
	children,
	className,
	style,
	...rest
}: Icon, ref) => {
	const componentClass = [
		onClick && 'clickable',
		size && s[size],
	];

	const customSizeStyle = size === 'custom' ? { width, height } : {};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			className={asm.join(s.Icon, className, componentClass)}
			onClick={onClick}
			ref={ref}
			style={{ ...style, ...customSizeStyle }}
			{...rest}
		>
			{children}
		</div>
	);
});

Icon.displayName = 'Icon';
