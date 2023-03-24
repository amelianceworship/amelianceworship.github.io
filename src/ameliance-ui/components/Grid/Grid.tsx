import type { ComponentProps, ElementType } from 'react';
import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { Component } from '../_LAB/Component';

type ComponentElementType = ComponentProps<ElementType>;

export interface GridProps extends ReactHTMLElementAttributes<ComponentElementType> {
	component?: ElementType;
	container?: boolean;
	row?: boolean;
}

export const Grid = forwardRef<ComponentElementType, GridProps>(({
	container,
	row,
	component = 'div',
	children,
	className,
	...rest
}, ref) => {
	const componentClass = [
		container && 'container',
		row && 'row',
	];

	const attributes	= {
		className: asm.join(className, componentClass),
		ref,
		...rest,
	};

	return (<Component as={component} {...attributes}>{children}</Component>);
});

Grid.displayName = 'Grid';
