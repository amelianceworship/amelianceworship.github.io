import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuContainer.module.scss';

type ComponentElementType = HTMLDivElement;

type MenuContainer = ReactHTMLElementAttributes<ComponentElementType>;

export const MenuContainer = forwardRef<ComponentElementType, MenuContainer>(({
	children,
	className,
	...rest
}: MenuContainer, ref) => (
	<div
		className={asm.join(s.MenuContainer, className)}
		ref={ref}
		{...rest}
	>
		{children}
	</div>
));

MenuContainer.displayName = 'MenuContainer';
