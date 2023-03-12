import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLElement;

type Footer = ReactHTMLElementAttributes<ComponentElementType>;

export const Footer = forwardRef<ComponentElementType, Footer>(({
	children,
	className,
	...rest
}, ref) => (
	<footer
		className={asm.join(className, 'footer')}
		ref={ref}
		{...rest}
	>
		{children}
	</footer>
));

Footer.displayName = 'Footer';
