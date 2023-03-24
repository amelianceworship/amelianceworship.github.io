import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './Button.module.scss';

type ComponentElementType = HTMLAnchorElement;

export interface ButtonLinkProps extends ReactHTMLElementAttributes<
ComponentElementType, React.AnchorHTMLAttributes<ComponentElementType>> {
	size?: ComponentSizes;
	width?: string | number;
	height?: string | number;
	disabled?: boolean;
	type?: 'primary' | 'secondary' | 'text';
	blank?: boolean;
	customStyle?: boolean;
}

export const ButtonLink = forwardRef<ComponentElementType, ButtonLinkProps>(({
	size = 'default',
	width,
	height,
	type = 'primary',
	blank,
	customStyle,
	children,
	className,
	style,
	...rest
}, ref) => {
	const hasLabel = Array.isArray(children)
		? children?.some((child) => typeof child === 'string')
		: typeof children === 'string';

	const componentClass = [
		size && s[size],
		type && s[type],
		!hasLabel && s.icon,
		s.Button,
	];

	const blankAttributes = blank && {
		target: '_blank',
		rel: 'noreferrer noopener',
	};

	const customSizeStyle = size === 'custom' ? { width, height } : {};

	return (
		<a
			className={asm.join(className, !customStyle && componentClass)}
			ref={ref}
			style={{ ...style, ...customSizeStyle }}
			{...blankAttributes}
			{...rest}
		>
			<span className={asm.join(s.label, 'button')}>
				{children}
			</span>
		</a>
	);
});

ButtonLink.displayName = 'ButtonLink';
