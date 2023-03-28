import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

type ComponentElementType = HTMLDivElement;

interface Container extends ReactHTMLElementAttributes<ComponentElementType> {
	gridContainer?: boolean;
}

export const Container = forwardRef<ComponentElementType, Container>(({
	gridContainer,
	children,
	className,
	...rest
}, ref) => (
	<div
		className={asm.join(className, 'container', gridContainer && 'row')}
		ref={ref}
		{...rest}
	>
		{children}
	</div>
));

Container.displayName = 'Container';
