import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './Link.module.scss';

type ComponentElementType = HTMLSpanElement;

interface LinkLabel extends ReactHTMLElementAttributes<ComponentElementType> {
	display?: TypographyVariants;
	noUnderline?: boolean;
	blank?: boolean;
}

export const LinkLabel = forwardRef<ComponentElementType, LinkLabel>(({
	display,
	noUnderline,
	children,
	blank,
	className,
	...rest
}, ref) => {
	// *----- create class from props -----
	const componentClass = [
		display || 'link',
		noUnderline && s.noUnderline,
	];

	const blankAttributes = blank && {
		target: '_blank',
		rel: 'noreferrer noopener',
	};

	return (
		<span
			className={asm.join(s.Link, className, componentClass)}
			ref={ref}
			{...blankAttributes}
			{...rest}
		>
			{children}
		</span>
	);
});

LinkLabel.displayName = 'LinkLabel';
