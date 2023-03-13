import { forwardRef } from 'react';

type ComponentElementType = HTMLLIElement;

type ListItem = ReactHTMLElementAttributes<ComponentElementType>;

export const ListItem = forwardRef<ComponentElementType, ListItem>(({
	children,
	className,
	...rest
}: ListItem, ref) => (
	<li
		className={className}
		ref={ref}
		{...rest}
	>
		{children}
	</li>
));

ListItem.displayName = 'ListItem';
