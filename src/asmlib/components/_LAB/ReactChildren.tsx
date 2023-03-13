import { Children, cloneElement, isValidElement } from 'react';

type ComponentElementType = HTMLElement;

type ReactChildren = ReactHTMLElementAttributes<ComponentElementType>;

export function ReactChildren({
	children,
	...rest
}: ReactChildren) {
	return (
		<>
			{Children.map(children, (child) => {
				if (!isValidElement(child)) return null;
				return cloneElement(child, {
					...child.props,
					...rest,
				});
			})}
		</>
	);
}
