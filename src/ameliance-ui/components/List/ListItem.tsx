import { forwardRef } from 'react';

type ComponentElementType = HTMLLIElement;

export type ListItemProps = ReactHTMLElementAttributes<ComponentElementType>;

export const ListItem = forwardRef<ComponentElementType, ListItemProps>(({
	children,
	className,
	...rest
}, ref) => (
	<li
		className={className}
		ref={ref}
		{...rest}
	>
		{children}
	</li>
));

ListItem.displayName = 'ListItem';
