import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLElement;

type Header = ReactHTMLElementAttributes<ComponentElementType>;

export const Header = forwardRef<ComponentElementType, Header>(({
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
