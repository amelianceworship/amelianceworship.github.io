import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './Link.module.scss';

type ComponentElementType = HTMLAnchorElement;

interface Link extends ReactHTMLElementAttributes<
ComponentElementType, React.AnchorHTMLAttributes<ComponentElementType>> {
	display?: TypographyVariants;
	noUnderline?: boolean;
	blank?: boolean;
}

export const Link = forwardRef<ComponentElementType, Link>(({
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
		<a
			className={asm.join(s.Link, className, componentClass)}
			ref={ref}
			{...blankAttributes}
			{...rest}
		>
			{children}
		</a>
	);
});

Link.displayName = 'Link';
