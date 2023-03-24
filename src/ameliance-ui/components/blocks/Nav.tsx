import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { getGridClass } from './helpers/grid';
import type { Grid } from './types/Grid';

type ComponentElementType = HTMLElement;
export interface NavProps extends ReactHTMLElementAttributes<ComponentElementType> {
	gridContainer?: boolean;
	grid?: Grid;
}

export const Nav = forwardRef<ComponentElementType, NavProps>(({
	gridContainer,
	grid,
	children,
	className,
	...rest
}, ref) => {
	const gridClass = grid && getGridClass(grid);

	return (
		<nav
			className={asm.join(className, gridContainer && 'row', gridClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</nav>
	);
});

Nav.displayName = 'Nav';
