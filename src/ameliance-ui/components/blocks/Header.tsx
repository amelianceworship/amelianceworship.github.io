import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLElement;

export type HeaderProps = ReactHTMLElementAttributes<ComponentElementType>;

export const Header = forwardRef<ComponentElementType, HeaderProps>(({
	children,
	className,
	...rest
}, ref) => (
	<header
		className={asm.join(className, 'header')}
		ref={ref}
		{...rest}
	>
		{children}
	</header>
));

Header.displayName = 'Header';
