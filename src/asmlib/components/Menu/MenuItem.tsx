import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuItem.module.scss';

type ComponentElementType = HTMLLIElement;

interface MenuItem extends ReactHTMLElementAttributes<ComponentElementType> {
	children: React.ReactNode;
	disabled?: boolean;
}

export const MenuItem = forwardRef<ComponentElementType, MenuItem>(({
	disabled,
	children,
	className,
	...rest
}: MenuItem, ref) => {
	// *----- create class from props -----
	const componentClass = [
		disabled && s.disabled,
	];

	return (
		<li
			className={asm.join(s.MenuItem, className, componentClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</li>
	);
});

MenuItem.displayName = 'MenuItem';
