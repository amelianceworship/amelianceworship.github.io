import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import { ReactChildren } from '../_LAB/ReactChildren';

import s from './List.module.scss';

type ComponentElementType = HTMLUListElement;

export interface ListProps extends ReactHTMLElementAttributes<ComponentElementType> {
	type?: 'unordered' | 'custom';
	margin?: number;
}

export const List = forwardRef<ComponentElementType, ListProps>(({
	type,
	margin,
	children,
	className,
	...rest
}, ref) => {
	const componentClass = [
		type === 'unordered' && s[type],
		type === 'custom' && s[type],
	];

	const componentStyle = {
		marginLeft: margin && `${margin}px`,
	};

	return (
		<ul
			className={asm.join(s.List, className, componentClass)}
			ref={ref}
			style={componentStyle}
			{...rest}
		>
			<ReactChildren style={componentStyle}>{children}</ReactChildren>
		</ul>
	);
});

List.displayName = 'List';
