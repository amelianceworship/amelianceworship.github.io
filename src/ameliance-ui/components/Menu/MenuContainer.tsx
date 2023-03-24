import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './MenuContainer.module.scss';

type ComponentElementType = HTMLDivElement;

export type MenuContainerProps = ReactHTMLElementAttributes<ComponentElementType>;

export const MenuContainer = forwardRef<ComponentElementType, MenuContainerProps>(({
	children,
	className,
	...rest
}, ref) => (
	<div
		className={asm.join(s.MenuContainer, className)}
		ref={ref}
		{...rest}
	>
		{children}
	</div>
));

MenuContainer.displayName = 'MenuContainer';
