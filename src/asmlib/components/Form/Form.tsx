import { forwardRef } from 'react';

type ComponentElementType = HTMLFormElement;

type Form = ReactHTMLElementAttributes<ComponentElementType>;

export const Form = forwardRef<ComponentElementType, Form>(({
	children,
	className,
	...rest
}: Form, ref) => (
	<form
		className={className}
		ref={ref}
		{...rest}
	>
		{children}
	</form>
));

Form.displayName = 'Form';
