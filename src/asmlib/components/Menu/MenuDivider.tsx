import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuDivider.module.scss';

type ComponentElementType = HTMLSpanElement;

type MenuDivider = ReactHTMLElementAttributes<ComponentElementType>;

export const MenuDivider = forwardRef<ComponentElementType, MenuDivider>(({
	className,
	...rest
}: MenuDivider, ref) => (
	<span
		className={asm.join(s.MenuDivider, className)}
		ref={ref}
		{...rest}
	/>
));

MenuDivider.displayName = 'MenuDivider';
