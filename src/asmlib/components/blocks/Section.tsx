import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import type { Grid } from './helpers/grid';
import { getGridClass } from './helpers/grid';

type ComponentElementType = HTMLElement;

interface Section extends ReactHTMLElementAttributes<ComponentElementType> {
	container?: boolean;
	gridContainer?: boolean;
	grid?: Grid;
}

export const Section = forwardRef<ComponentElementType, Section>(({
	gridContainer,
	grid,
	children,
	className,
	...rest
}: Section, ref) => {
	const componentClass = [
		grid && getGridClass(grid),
	];

	return (
		<section
			className={asm.join(className, gridContainer && 'row', componentClass)}
			ref={ref}
			{...rest}
		>
			{children}
		</section>
	);
});

Section.displayName = 'Section';
