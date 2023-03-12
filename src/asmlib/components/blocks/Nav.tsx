import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import type { Grid } from './helpers/grid';
import { getGridClass } from './helpers/grid';

type ComponentElementType = HTMLElement;

interface Nav extends ReactHTMLElementAttributes<ComponentElementType> {
	gridContainer?: boolean;
	grid?: Grid;
}

export const Nav = forwardRef<ComponentElementType, Nav>(({
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
