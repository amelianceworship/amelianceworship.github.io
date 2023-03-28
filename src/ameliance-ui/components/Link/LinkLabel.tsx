import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import typography from '../Typography/Typography.module.scss';
import s from './Link.module.scss';

type ComponentElementType = HTMLSpanElement;

export interface LinkLabelProps extends ReactHTMLElementAttributes<ComponentElementType> {
	display?: TypographyVariants;
	underline?: boolean;
	blank?: boolean;
}

export const LinkLabel = forwardRef<ComponentElementType, LinkLabelProps>(({
	display,
	underline,
	children,
	blank,
	className,
	...rest
}, ref) => {
	// *----- create class from props -----
	const componentClass = [
		display ? typography[display] : typography.link,
		underline === false && s.noUnderline,
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
