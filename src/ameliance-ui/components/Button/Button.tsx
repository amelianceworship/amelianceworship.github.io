import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './Button.module.scss';

type ComponentElementType = HTMLButtonElement;

export interface ButtonProps extends ReactHTMLElementAttributes<ComponentElementType> {
	size?: ComponentSizes;
	disabled?: boolean;
	type?: 'primary' | 'secondary' | 'text';
	submit?: boolean;
}

export const Button = forwardRef<ComponentElementType, ButtonProps>(({
	size = 'default',
	type = 'primary',
	submit,
	children,
	className,
	...rest
}, ref) => {
	// *----- check is icon should be button icon  -----
	const hasLabel = Array.isArray(children)
		? children?.some((child) => typeof child === 'string')
		: typeof children === 'string';

	const sizeClass = size && s[size];

	const componentClass = [
		type && s[type],
		!hasLabel && s.icon,
	];

	return (
		<button
			type={submit ? 'submit' : 'button'}
			className={asm.join(s.Button, className, sizeClass, componentClass)}
			ref={ref}
			{...rest}
		>
			<span className={asm.join(s.label, sizeClass, 'button')}>
				{children}
			</span>
		</button>
	);
});

Button.displayName = 'Button';
