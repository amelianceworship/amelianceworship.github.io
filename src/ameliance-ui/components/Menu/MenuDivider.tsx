import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuDivider.module.scss';

type ComponentElementType = HTMLSpanElement;

export type MenuDividerProps = ReactHTMLElementAttributes<ComponentElementType>;

export const MenuDivider = forwardRef<ComponentElementType, MenuDividerProps>(({
	className,
	...rest
}, ref) => (
	<span
		className={asm.join(s.MenuDivider, className)}
		ref={ref}
		{...rest}
	/>
));

MenuDivider.displayName = 'MenuDivider';
