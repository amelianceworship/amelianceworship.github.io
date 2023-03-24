import { Children, cloneElement, isValidElement } from 'react';

type ComponentElementType = HTMLElement;

export type ReactChildrenProps = ReactHTMLElementAttributes<ComponentElementType>;

export function ReactChildren({
	children,
	...rest
}: ReactChildrenProps) {
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
