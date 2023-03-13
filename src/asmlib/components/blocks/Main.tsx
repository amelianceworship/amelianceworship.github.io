import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLElement;

type Main = ReactHTMLElementAttributes<ComponentElementType>;

export const Main = forwardRef<ComponentElementType, Main>(({
	children,
	className,
	...rest
}, ref) => (
	<main
		className={asm.join(className, 'main')}
		ref={ref}
		{...rest}
	>
		{children}
	</main>
));

Main.displayName = 'Main';
