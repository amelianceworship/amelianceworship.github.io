import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { Component } from '../_LAB/Component';

type ComponentElementType = HTMLHeadingElement | HTMLParagraphElement;

export interface TypographyProps extends ReactHTMLElementAttributes<ComponentElementType> {
	component?: TypographyVariants;
	display?: TypographyVariants;
}

const tag = {
	h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
};

export const Typography = forwardRef<ComponentElementType, TypographyProps>(({
	component,
	display,
	children,
	className,
	...rest
}, ref) => {
	const componentTag = component || 'p';

	const attributes = { className: asm.join(className, display || component), ref, ...rest };

	const tagType = tag[componentTag as keyof typeof tag] || 'p';

	return (<Component as={tagType as keyof typeof tag} {...attributes}>{children}</Component>);
});

Typography.displayName = 'Typography';
