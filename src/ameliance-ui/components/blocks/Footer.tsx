import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLElement;

export type FooterProps = ReactHTMLElementAttributes<ComponentElementType>;

export const Footer = forwardRef<ComponentElementType, FooterProps>(({
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
