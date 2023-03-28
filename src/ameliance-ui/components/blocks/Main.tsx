import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLElement;

export type MainProps = ReactHTMLElementAttributes<ComponentElementType>;

export const Main = forwardRef<ComponentElementType, MainProps>(({
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
