import type { ComponentProps, ElementType } from 'react';
import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { Component } from '../_LAB/Component';

type ComponentElementType = ComponentProps<ElementType>;

interface Block extends ReactHTMLElementAttributes<ComponentElementType> {
	component?: ElementType;
}

export const Block = forwardRef<ComponentElementType, Block>(({
	component = 'div',
	children,
	className,
	...rest
}, ref) => {
	// const componentClass = [
	// ];

	const attributes	= {
		className: asm.join(className),
		ref,
		...rest,
	};

	return (<Component as={component} {...attributes}>{children}</Component>);
});

Block.displayName = 'Block';
