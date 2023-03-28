import { forwardRef } from 'react';

type ComponentElementType = HTMLFormElement;

export type FormProps = ReactHTMLElementAttributes<ComponentElementType>;

export const Form = forwardRef<ComponentElementType, FormProps>(({
	children,
	className,
	...rest
}, ref) => (
	<form
		className={className}
		ref={ref}
		{...rest}
	>
		{children}
	</form>
));

Form.displayName = 'Form';
